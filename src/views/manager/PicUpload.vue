<template>
	<div style="padding: 20px;">
		<div class="page-title">{{title}}</div>
		<div class="">
			<div style="margin-bottom:20px;">
				<span>选择分类：</span>
				<el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
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
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
			<el-button style=" width: 80px;" type="primary" @click="handleSubmit">提 交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pic-upload',
		data() { 
			return {
				title: "图片上传",
				fileList: [],
				options: [{
          value: '1',
          label: '美图'
        }, {
          value: '2',
          label: '壁纸'
        }, {
          value: '3',
          label: '萌宠'
        }],
        value: ''
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
      	console.log(this.value);
      }
    }
	}
</script>

<style lang="less">
	
</style>