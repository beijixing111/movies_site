<template>
	<div style="padding: 20px;">
		<div class="page-title">发布公告：</div>
		<div style="margin-bottom:20px;">
			<el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		</div>
		<div style="margin-bottom:20px; width: 500px;">
			<el-input 
			  type="textarea"
			  :rows="2"
			  placeholder="请输入公告内容"
			  v-model="textarea">
			</el-input>
		</div> 
		<el-button style=" width: 120px;" type="primary" @click="handleMessage">发 布</el-button>
	</div>
</template>

<script> 
	export default {
		name: 'message',
		data() { 
			return {
				textarea: "", 
				options: [{
          value: '1',
          label: '通知'
        }, {
          value: '2',
          label: '消息'
        }, {
          value: '3',
          label: '警告'
        }],
        value: ''
			}
		},

		methods: {
			handleMessage() {
				if(this.textarea == '' || this.textarea == null) {
					return;
				} 
				if(this.value == '') return;
				let textObj = this.options.find(item => item.value == this.value);  
				console.log(textObj);
				this.$store.dispatch("addMessage", {
					message: `${textObj.label}：${this.textarea}` 
				});
				this.value = '';
				this.textarea = '';
			}
		}
	}
</script>

<style lang="less">
	
</style>