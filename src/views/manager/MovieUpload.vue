<template>
	<div style="padding: 20px;">
		<div class="page-title">{{title}}</div>
		<div class="">
			<div style="margin-bottom:20px;">
				<span>选择分类：</span>
				<el-select v-model="movietype" placeholder="请选择电影类型">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div style="margin-bottom:20px; width: 400px;"> 
				<el-input v-model="moviename" placeholder="请输入电影名称"></el-input>
			</div>
			<div style="margin-bottom:20px; width: 400px;"> 
				<el-input v-model="movieowner" placeholder="请输入导演名称"></el-input>
			</div>
			<div style="margin-bottom:20px; width: 400px;"> 
				<el-input v-model="movieposter" placeholder="请输入封面地址"></el-input>
			</div>
			<div style="margin-bottom:20px; width: 400px;">
				<a style="color: #409EFF;" :href="linkadr" target="_blank">去上传</a>（上传完成后复制地址填写）
			</div>
			<div style="margin-bottom:30px; width: 400px;" >
				<el-input v-model="movieadr" placeholder="请输入电影地址"></el-input>
			</div>
			<div style="margin-bottom:20px; width: 400px;">
				<el-input 
				  type="textarea"
				  :rows="2"
				  placeholder="电影简介"
				  v-model="moviedesc">
				</el-input>
			</div> 
			<el-button style=" width: 80px;" type="primary" @click="handleSubmit">提 交</el-button>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios';
	let options = {
		"1": "恐怖",
		"2": "爱情",
		"3": "搞笑",
		"4": "科幻",
		"5": "原创",
		"6": "其他"
	};
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
				// linkadr: 'http://47.107.140.238:3003/uploadfile',
				linkadr: 'http://localhost:3003/uploadfile',
				options: opts,
        movietype: '',
        moviename: '',  
        movieowner: '',
        movieposter: '',
        movieadr: "",
        moviedesc: ''
			}
		},
		methods: { 
      handleSubmit() {
      	console.log(this.movietype, this.desc);
      	let movieinfo = {
      		movietype: options[this.movietype],
      		moviename: this.moviename,
      		movieowner: this.movieowner,
      		movieadr: this.movieadr,
      		movieposter: this.movieposter,
      		moviedesc: this.moviedesc
      	};
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
		      }else{
		      	this.$message.error(msg);
		      }
		    })
		    .catch(err => {
		      console.log(err); 
		      this.$message.error("出现了！");
		    }) 
	    }
    }
	}
</script>

<style lang="less">
	
</style>