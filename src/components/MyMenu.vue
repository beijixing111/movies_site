<template>
	<div class="my-header">
		<div class="logo">
			<router-link to="/" class="logo-text">迷你影院</router-link>	
		</div>
		<el-menu :default-active="activeIndex" background-color="#303133" class="el-menu-demo my-menu" 
			mode="horizontal" 
			@select="handleSelect" 
			router text-color="#fff"
			active-text-color="#fff"
			> 
		  <el-menu-item index="1" :route="{path: '/'}">首页</el-menu-item>
		  <el-menu-item index="2" :route="{path: '/movies'}">电影</el-menu-item>
		  <el-menu-item index="3" :route="{path: '/pics'}">图片</el-menu-item>
		  <el-menu-item index="4" :route="{path: '/about'}">关于</el-menu-item>
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
	</div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
	.logo{
		position: absolute;
		left: 0;
		top: 4px;
		width: 100px;
		height: 50px; 
		border-radius: 5px;
		z-index: 99; 
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 5px #ccc;
	}
	.logo-text{
		font-size: 20px;
		color: #fff;
	}
	.my-header{
		width: 1200px; margin: 0 auto; 
		position: relative; 
	}
	.my-menu{
		background: none; color: #fff; 
		padding-left: 140px;
 	}
	/*.el-menu--horizontal>.el-menu-item {
		color: #fff;
	}
	.el-menu--horizontal>.el-menu-item.is-active{
		background: #000;
		color: #fff;
	}
	.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
		background: #000;
		color: #fff;
	}
	.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
		color: #fff;
	}*/
</style>