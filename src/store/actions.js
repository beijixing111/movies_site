

import * as Apis from '../apis'; 
export default {
  getMenuInfo ({commit, state}) {
    Apis.getMenuInfo({
      loginStatus: state.userInfo.loginStatus ? 1 : 0
    }) 
    .then(res => {
      let {code, data} = res.data;
      if(code == 1){
        console.log(data);
        commit('getMenuInfo', { data: data})
      } 
    })
  },
	login ({commit, state, dispatch}, userinfo) { 
    if(userinfo && userinfo.out) {
      state.userInfo.loginStatus = false;
      dispatch('getMenuInfo');
      return commit('login', userinfo);
    }
    let userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      userInfo = JSON.parse(userInfo);
      state.userInfo.loginStatus = userInfo.loginStatus;
      state.userInfo.nickName = userInfo.nickName;
      dispatch('getMenuInfo');
      return;
    }
    if(!userinfo){
      return dispatch('getMenuInfo'); 
    }      
    Apis.login({
      username: userinfo.name,
      password: userinfo.pass
    })
    .then(res => {
      console.log(res);
      let {code, data} = res.data;
      if(code == 1){
        commit('login', data);
        state.userInfo.loginStatus = true;
        dispatch('getMenuInfo');
      }else {
        console.log('出错了！');
      }
    })
		
	},
	getHomeData({commit, state}) {
    // if(state.homeList != 0) return;
    Apis.getMovieData()
    .then(res => {
      // console.log(res);
      let {code, data} = res.data;
      if(code == 1){
        // console.log(data);
        commit('getHomeData', { data: data})
      } 
    })
    .catch(err => {
      console.log(err);
    }) 
  },
  getMovieData({commit, state}) {
    // if(state.homeList != 0) return;
    Apis.getMovieData()
    .then(res => {
      console.log(res);
      let {code, data} = res.data;
      if(code == 1){
        console.log(data);
        commit('getMovieData', { data: data})
      } 
    })
    .catch(err => {
      console.log(err);
    }) 
  },
  getPicData({commit, state}) {
    // if(state.homeList != 0) return;
    Apis.getPicData()
    .then(res => {
      console.log(res);
      let {code, data} = res.data;
      if(code == 1){
        console.log(data);
        commit('getPicData', { data: data})
      } 
    })
    .catch(err => {
      console.log(err);
    }) 
  },
  addMessage ({commit}, data) {
    console.log(data);
    commit("adddMessage", data);
  },
  getUserData({commit, state}) {
    // if(state.homeList != 0) return;
    Axios.get("/api/user.json")
    .then(res => {
      console.log(res);
      let {code, data} = res.data;
      if(code == 1){
        console.log(data);
        setTimeout(() => {
          commit('getUserData', { data: data})
        }, 2000); 
      } 
    })
    .catch(err => {
      console.log(err);
    }) 
  },
	addTodo ({ commit, state}, text) {
		console.log(state);
		commit('addTodo', {
			text,
			done: false
		})
	},
	removeTodo ({ commit }, todo) {
		commit('removeTodo', todo)
	},
	toggleTodo ({ commit }, todo) {
		commit('editTodo', {todo, done :!todo.done})
	},
	editTodo ({commit}, { todo, value }) {
		commit('editTodo', { todo, text: value })
	},
	toggleAll ({state, commit}, done) {
		state.todos.forEach((todo) => {
			commit('editTodo', {todo, done})
		})
	},
	getData ({ commit }) {
		Axios.get("/api/data.json")
		.then(res => {
			console.log(res);
			commit('getData', { data: res.data })
		})
		.catch(err => {
			console.log(err);
		})
	},
  //;
  updateRoutePath({commit}, path) {
    console.log(path); 
    let _path = window.location.hash.replace(/^#(\/\w+)\/?.*/g, '$1');
    _path = _path.replace('#', '');
    commit('updateRoutePath', {
      path: path ? path : _path
    })
  }
}