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
			<div style="margin-bottom:20px; width: 300px;"> 
				<el-input v-model="moviename" placeholder="请输入电影名称"></el-input>
			</div>
			<div style="margin-bottom:30px;">
				<el-upload
				  class="upload-demo"
				  action=""
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="fileList"
				  :on-success="uploadSuccess"
				  :on-error="uploadErr"
				  :on-change="handleChange"
				  list-type="picture">
				  <el-button size="small" type="primary">电影上传</el-button>
				  <div slot="tip" class="el-upload__tip">仅支持500M以下</div>
				</el-upload>
			</div>
			<div style="margin-bottom:20px; width: 500px;">
				<el-input 
				  type="textarea"
				  :rows="2"
				  placeholder="电影简介"
				  v-model="desc">
				</el-input>
			</div> 
			<el-button style=" width: 80px;" type="primary" @click="handleSubmit">提 交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Movie-upload',
		data() { 
			return {
				title: "视频上传",  
        moviename: '', 
				options: [{
          value: '1',
          label: '恐怖'
        }, {
          value: '2',
          label: '爱情'
        }, {
          value: '3',
          label: '搞笑'
        }],
        movietype: '',
        fileList: [],
        desc: ''
			}
		},
		methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadSuccess(response, file, fileList) {
      	console.log(response, file, fileList);
      },
      uploadErr(err, file, fileList){
      	console.log(err, file, fileList);
      },
      handleChange(file, fileList) {
      	console.log(file, fileList);
      },
      handleSubmit() {
      	console.log(this.movietype, this.desc);
      }
    }
	}
</script>

<style lang="less">
	
</style>