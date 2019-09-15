import { Message } from 'element-ui';

export const mutations = {
	login (state, userinfo) {
		console.log(state);
		if(!userinfo.out){
			state.userInfo = {
				nickName: "北极星",
	      loginStatus: true
	    }; 
	    if(localStorage.getItem('userInfo')){
	    	return;
	    }
	    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
	    Message({ 
	    	message: '登录成功！',
	    	type: 'success',
	    	duration: 3000 
	    });
		}else{
			state.userInfo = {
				nickName: "",
	      loginStatus: false
			}
			window.localStorage.removeItem('userInfo');
		} 
	},
	getHomeData (state, data) {
		console.log(data); 
		state.homeList = [].concat(data.data.dataList); 
	},
	getMovieData (state, data) {
		console.log(data);
		state.movieList = [].concat(data.data.dataList); 
	},
	getPicData (state, data) {
		console.log(data);
		state.picList = [].concat(data.data.dataList); 
	},
	adddMessage (state, data) {
		state.globalMsg = data.message;
	},
	getUserData (state, data) {
		console.log(data);
		state.userList = [].concat(data.data.dataList); 
	},

	addTodo (state, todo) {
		state.todos.push(todo)
	},
	removeTodo (state, todo) {
		state.todos.splice(state.todos.indexOf(todo), 1)
	},
	editTodo (state, { todo, text = todo.text,  done = todo.done }) {
		todo.text = text
		todo.done = done
	},
	getData (state, data ) {
		console.log(data.data);
		state.datas = data.data.data;
	}
}