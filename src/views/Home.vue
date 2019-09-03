<template>
	<div class="my-home clearfix">
		<!-- <div style="height: 1100px"></div> -->
		<el-row :gutter="20" class="clearfix">
		  <el-col :span="6" v-for="(item, index) in dataList" :key="index" >
		  	<router-link :to="'/movies/' + item.id" style="display: block;">
			    <el-card :body-style="{ padding: '0px' }"> 
			      <img src="/static/images/p2557391568.webp" class="image">
			      <div style="padding: 14px;">
			        <p>{{item.name}}</p>
			        <p>类型：{{item.type}}</p>
							<p>导演：{{item.owner}}</p>
							<p class="desc">{{item.desc}}</p> 
			        <div class="bottom clearfix"> 
			        </div>
			      </div>
			    </el-card>
			  </router-link>
		  </el-col>
		</el-row>
		<div class="clearfix"></div>
	</div>
</template>

<script>
	import Axios from 'axios';
	export default {
		name: "Home",
		components: {},
	  data() {
	    return {
	    	dataList: [],
	    	total: 0
	    };
	  },
	  created() { 
	  	this.getData();
	  	 
	  },
	  methods: {
	  	getData() {
		  	Axios.get("/api/list.json")
	      .then(res => {
	        console.log(res);
	        let {code, data} = res.data;
	        if(code == 1){
	          console.log(data);
	          this.dataList = data.dataList;
	          this.total = data.total;
	        } 
	      })
	      .catch(err => {
	        console.log(err);
	      })
	    }
	  }
	}
</script>

<style>
	.my-home{
		width: 1200px; margin: 0 auto;
	}
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-col{
  	border-radius: 4px; margin-bottom: 20px;
  }
  .el-card__body{
  	height: 500px;
  	overflow: hidden;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%; height: 300px;
    display: block;
  }
  .desc{
  	font-size: 12px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  p{
  	text-align: left; line-height: 20px;
  }
  .clearfix:after {
      clear: both
  }
</style>