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
		  <el-menu-item v-for="item in dataRoute" :key="item.path" :index="item.path" :route="{path: item.path}" >{{item.label}}</el-menu-item>
		  
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
	import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        // activeIndex: '/', 
        visibility: false,
        logoPic: './static/images/mimyz.png', 
      };
    },
    components: {
    	"mm-login": () => import("@/components/Login")
    },
    mounted() {
    	this.chenckLogin();
    	// this.getMenuInfo(); 
    	this.updateRoutePath();
    },
    computed: {
    	dataRoute() {
    		return this.$store.state.menuinfo;
    	},
    	userInfo() {
    		return this.$store.state.userInfo;
    	},
    	activeIndex() {
    		console.log(this.$store.state.activeIndex);
    		if(this.$store.state.activeIndex == '/index') {
    			return '/';
    		}
    		return this.$store.state.activeIndex;
    	}
    },
    methods: {
    	...mapActions(["updateRoutePath"]),
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.updateRoutePath(key);
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
      	this.$store.dispatch('login');  
      }
    }
  }
</script>

<style lang="less" scoped>
	.logo{
		position: absolute;
		left: 0; top: 4px;
		width: 120px; height: 50px; 
		border-radius: 5px;
		z-index: 99; display: flex;
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
    &:hover{
    	background: #2b83f1;
    	box-shadow: 0 0 3px #fff;
    }
 	}
 	
</style>