
import Axios from 'axios';

export default {

	login ({commit}, userinfo) { 
		commit('login', userinfo);
	},
	getHomeData({commit, state}) {
    // if(state.homeList != 0) return;
    Axios.get("/api/movie")
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
    Axios.get("/api/movie")
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
    Axios.get("/api/piclist.json")
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
	}
}