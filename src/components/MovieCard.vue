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
			    		<p>{{item.name}}</p> 
			    		<p>
			    			<span>类型：{{item.type}}</span>
			    			<span>导演：{{item.owner}}</span>
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
	.el-card__body{
  	height: 260px;
  	overflow: hidden;
  	position: relative;
  	.wrapper{
			width: 100%;
  	}
  	.movie-info{
  		position: absolute; 
  		left: 0;
			right: 0;
			bottom: 0;
  		height: 90px;
  		box-sizing: border-box;
  		display: flex;
  		flex: 1;
  		flex-direction: column;
  		background: rgba(0,0,0,.5);
  		color: #fff;
			padding: 10px 15px; 
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