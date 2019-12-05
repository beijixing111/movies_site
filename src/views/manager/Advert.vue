<template>
	<div style="padding: 20px;">
		<div class="page-title">{{title}}</div>
		<div class="">
			<el-form :model="movie">
				<div style="margin-bottom:20px;">
					<span>选择分类：</span>
					<el-select v-model="movie.type" placeholder="请选择电影类型">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div style="margin-bottom:20px; width: 400px;"> 
					<el-input v-model="movie.name" placeholder="请输入电影名称"></el-input>
				</div>
				<div style="margin-bottom:20px; width: 400px;"> 
					<el-input v-model="movie.owner" placeholder="请输入导演名称"></el-input>
				</div>
				<div style="margin-bottom:20px; width: 400px;"> 
					<el-input v-model="movie.poster" placeholder="请输入封面地址"></el-input>
				</div>
				<div style="margin-bottom:20px; width: 400px;">
					<a style="color: #409EFF;" :href="linkadr" target="_blank">去上传</a>（上传完成后复制地址填写）
				</div>
				<div style="margin-bottom:30px; width: 400px;" >
					<el-input v-model="movie.adr" placeholder="请输入电影地址"></el-input>
				</div>
				<div style="margin-bottom:20px; width: 400px;">
					<el-input 
					  type="textarea"
					  :rows="2"
					  placeholder="电影简介"
					  v-model="movie.desc">
					</el-input>
				</div> 
			</el-form>
			<el-button style=" width: 80px;" type="primary" @click="handleSubmit">提 交</el-button>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios';
	 
	export default {
		name: 'Movie-upload',
		data() { 
			let opts = [];
			for(let x in options) {
				opts.push({
					value: x,
					label: options[x]
				});
			}
			return {
				title: "视频上传", 
				linkadr: 'http://47.107.140.238:3003/uploadfile',
				// linkadr: 'http://localhost:3003/uploadfile',
				options: opts,
        movie: {
        	type: '',
        	name: '',
        	owner: '',
        	poster: '',
        	adr: '',
        	desc: ''
        }
			}
		},
		methods: { 
      handleSubmit() { 
      	this.movie.type = options[this.movie.type];
      	let movieinfo = this.movie; 
      	console.log(movieinfo); 
      	Axios.post("/api/movie", movieinfo)
		    .then(res => {
		      console.log(res);
		      let {code, data, msg} = res.data;
		      if(code == 1){
		        console.log(data);
		        this.$message({
			    		message: msg,
	          	type: 'success'
			    	}); 
			    	this.movie = {
		        	type: '',
		        	name: '',
		        	owner: '',
		        	poster: '',
		        	adr: '',
		        	desc: ''
		        };

		      }else{
		      	this.$message.error(msg);
		      }
		    })
		    .catch(err => {
		      console.log(err); 
		      this.$message.error("出错了！");
		    }) 
	    }
    }
	}
</script>

<style lang="less">
	
</style>