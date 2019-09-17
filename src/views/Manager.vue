<template>
	<div class="manager">
		<el-row class="tac">
		  <el-col :span="4" > 
		    <el-menu
			      :default-active="activeIndex"
			      class="el-menu-vertical-demo"
			      @select="handleSelect" 
			      @open="handleOpen"
			      @close="handleClose"
			      router
		      > 
		      <el-menu-item index="1" :route="{path: 'message'}">
		        <i class="el-icon-reading"></i>
		        <span slot="title">发布公告</span>
		      </el-menu-item>
		      <el-submenu index="2">
		        <template slot="title">
		          <i class="el-icon-video-camera-solid"></i>
		          <span>电影管理</span>
		        </template> 
		        <el-menu-item-group>
		          <el-menu-item index="2-1" :route="{path: 'movielist'}">
		          	电影列表
		          </el-menu-item>
		          <el-menu-item index="2-2" :route="{path: 'movieupload'}">
		          电影上传</el-menu-item>
		        </el-menu-item-group>  
		      </el-submenu>
		      <el-submenu index="3">
		      	<template slot="title">
		          <i class="el-icon-picture"></i>
		          <span>图片管理</span>
		        </template> 
		        <el-menu-item-group>
		          <el-menu-item index="3-1" :route="{path: 'piclist'}">
		          图片列表</el-menu-item>
		          <el-menu-item index="3-2" :route="{path: 'picupload'}">
		          图片上传</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="4">
		      	<template slot="title">
		          <i class="el-icon-user-solid"></i>
		          <span>用户管理</span>
		        </template> 
		        <el-menu-item-group>
		          <el-menu-item index="4-1" :route="{path: 'usermanager'}">
		          用户列表</el-menu-item> 
		        </el-menu-item-group>
		      </el-submenu>
		      
		    </el-menu>
		  </el-col>
		  <el-col :span="20"> 
		  	<div class="right-ctx">
		  		<router-view/>
		  	</div> 
		  </el-col>
		</el-row>  
	</div>
</template>

<script>
	export default {
		data() {
      return {
        activeIndex: '1'
      };
    },
    mounted() {
    	this.activeIndex = window.location.pathname;
    },
		methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
	}
</script>

<style lang="less">
	.manager{
		width: 1200px; margin: 0 auto;
		min-height: 600px;
		.manager-menu{ 
			min-height: 600px;
			.el-menu{
				// background: #303133;
			}
		}
		.right-ctx{
			background: #fff;
			margin-left: 20px;
			min-height: 600px;
			text-align: left;
			.page-title{
				text-align: left; margin-bottom: 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.el-pagination{
				padding: 15px 0;
				text-align: right;
			}
		}
	}

</style>