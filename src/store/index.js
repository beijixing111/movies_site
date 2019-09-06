import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';
import actions from './actions';
// import 

Vue.use(Vuex)
 
let userInfo = {
	nickName: '',
	loginStatus: false
}; 

export default new Vuex.Store({
	state: {
		todos: [],
		userInfo: userInfo, //用户信息
		homeList: [], //首页数据
		movieList: [], //电影列表数据
		picList: [],  //图片列表数据
		globalMsg: '',	//公告信息 
		userList: []   //用户列表
	},
	actions,
	mutations
});







