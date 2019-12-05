<template>
	<div>
		<el-row :gutter="5" class="clearfix">
		  <el-col :span="4" v-for="(item, index) in dataList" :key="item.id" >
		  	<router-link :to="'/movies/' + item.id" style="display: block;">
			    <el-card :body-style="{ padding: '0px' }"> 
			      <el-image :src="item.poster" class="wrapper">
				      <div slot="placeholder" class="image-slot">
				        加载中<span class="dot">...</span>
				      </div>
				    </el-image>
			    	<div class="movie-info">
			    		<p>{{!item.name ? '未知' : item.name}}</p> 
			    		<p>
			    			<span>类型：{{item.type? item.type : '其他'}}</span>
			    			<span>导演：{{item.owner? item.owner : '未知'}}</span>
			    		</p>
							<div class="desc-text">简介：{{!!item.desc ? item.desc : "暂无信息..."}}</div> 
			    	</div> 
			    </el-card>
			  </router-link>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "MovieCard", 
		props: {
			dataList: Array
		},
		data() {
			return {
				ddd: ''
			}
		}
		
	}
</script>

<style lang="less">	
	.el-col{
  	border-radius: 4px; margin-bottom: 20px;
  }
  .el-card {
  	border: none !important;
  	&:hover { 
	    box-shadow: 0 2px 12px 0 rgba(81, 158, 255, 0.86) !important;
  	}
  	&:hover .movie-info{
			transform: translateY(0);
		}	
  }
	.el-card__body{
  	height: 260px;
  	overflow: hidden;
  	position: relative;
  	.wrapper{
			width: 100%;
  	}
  	.movie-info{
  		position: absolute; 
  		left: 0; right: 0;
			bottom: 0; height: 50%;
  		box-sizing: border-box;
  		display: flex; flex: 1;
  		flex-direction: column;
  		background: rgba(0,0,0,.35);
  		color: #fff;
			padding: 10px 5px; 
			transform: translateY(70%);
			transition: all .3s ease-in; 
  		p{
  			font-size: 14px; line-height: 20px; 
  			margin-bottom: 8px;
  			&:first-child{
  				font-size: 16px; font-weight: bold;  
  			}
  			span{
  				margin-right: 15px;
  			}
  		}
  	}
  	.desc-text{
	  	font-size: 12px;
	  	line-height: 18px; text-align: left;
	  }
  } 
</style>