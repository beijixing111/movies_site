<template>
	<div class="my-header">
		<div class="logo">
			<router-link to="/" class="logo-text">
				<img :src="logoPic" alt="">
			</router-link>	
		</div>
		<el-menu 
			:default-active="activeIndex" 
			background-color="#303133" 
			class="el-menu-demo my-menu" 
			mode="horizontal" 
			@select="handleSelect" 
			router 
			text-color="#fff"
			active-text-color="#fff"
			> 
		  <el-menu-item v-for="item in dataRoute" :key="item.path" :index="item.path" :route="{path: item.path}"
		   v-if="item.path != '/manager'">{{item.label}}</el-menu-item>
		   <el-menu-item index="/manager" v-if="userInfo.loginStatus" :route="{path: '/manager'}">管理</el-menu-item>
		  <!-- 
		  <el-menu-item index="2" :route="{path: '/movies'}">电影</el-menu-item>
		  <el-menu-item index="3" :route="{path: '/pics'}">图片</el-menu-item>
		  
		  <el-menu-item index="5" :route="{path: '/about'}">关于</el-menu-item> -->
		  <!-- <el-submenu index="2">
		    <template slot="title">我的工作台</template>
		    <el-menu-item index="2-1">选项1</el-menu-item>
		    <el-menu-item index="2-2">选项2</el-menu-item>
		    <el-menu-item index="2-3">选项3</el-menu-item>
		    <el-submenu index="2-4">
		      <template slot="title">选项4</template>
		      <el-menu-item index="2-4-1">选项1</el-menu-item>
		      <el-menu-item index="2-4-2">选项2</el-menu-item>
		      <el-menu-item index="2-4-3">选项3</el-menu-item>
		    </el-submenu>
		  </el-submenu> --> 
		  
		</el-menu>
		<div class="login-info">
			<el-button class="login" v-if="!userInfo.loginStatus" @click="toggleLogin(true)">登录</el-button>
			<span v-else>Hi，{{userInfo.nickName}}<span @click="loginOut" class="login-out">退出</span></span>
		</div>
		<mm-login :visibility="visibility" @closeLogin="toggleLogin" />
		
	</div>
</template>

<script>
	import Login from '@/components/Login';
  export default {
    data() {
      return {
        activeIndex: '/', 
        visibility: false,
        logoPic: './static/images/mimyz.png',
        dataRoute: [
        	{
        		path: '/',
        		label: '首页'
        	},
        	{
        		path: '/movies',
        		label: '电影'
        	},{
        		path: '/pics',
        		label: '美图'
        	},{
        		path: '/manager',
        		label: '管理'
        	},{
        		path: '/about',
        		label: '关于'
        	}
        ] 
      };
    },
    components: {
    	"mm-login": () => import("@/components/Login")
    },
    mounted: function() {
    	this.chenckLogin();
    	this.activeIndex = window.location.hash.replace('#', '');
    },
    computed: {
    	userInfo() {
    		return this.$store.state.userInfo;
    	}
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleLogin(bool) {
      	this.visibility = bool;
      },
      loginOut() {
      	this.$confirm('确定要退出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$store.dispatch('login', { out: true}); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      	
      },
      chenckLogin() {
      	let userInfo = localStorage.getItem("userInfo");
      	if(userInfo){
      		userInfo = JSON.parse(userInfo);
      		this.$store.dispatch('login', userInfo); 
      	}
      }
    }
  }
</script>

<style lang="less">
	.logo{
		position: absolute;
		left: 0;
		top: 4px;
		width: 120px;
		height: 50px; 
		border-radius: 5px;
		z-index: 99; 
		display: flex;
		justify-content: center;
		align-items: center; 
	}
	.logo-text{
		display: block; width: 100%; height: 100%; 
		img{
			display: block; width: 100%;
		}
	}
	.login{
		background: #409EFF !important;
		color: #fff !important;
		&:hover{
			background: #409EFF !important; 
			color: #fff !important;
		}
	}
	.my-header{
		width: 1200px; margin: 0 auto; 
		position: relative; 
		.el-dialog{
			max-width: 540px !important;
		}
	}
	.my-menu{
		background: none; color: #fff; 
		padding-left: 140px !important; 
 	}
 	.el-menu-item{
 		font-size: 16px;
 	}
 	.login-info{
		position: absolute;
		right: 0;
		text-align: right;
		top: 0;
		line-height: 60px;
		font-size: 14px;
		color: #519eff;
 	}
 	.login-out{
 		margin-left: 10px; 
 		font-size: 14px;
 		cursor: pointer;
 		padding: 5px 10px;
    background: #519eff;
    color: #fff;
    border-radius: 5px;
 	}
 	
</style>