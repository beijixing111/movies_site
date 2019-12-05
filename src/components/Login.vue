<template>
	<div>
		<el-dialog title="登录" 
			:center="true"
			width="40%"
			:visible.sync="visibility" 
			:before-close="handleClose">
		  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
		    <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
		      <el-input  
		      	type="text" 
		      	v-model="ruleForm.name"  
		      	autocomplete="off">
		      </el-input>
		    </el-form-item>
		    <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
			    <el-input type="password" 
			    	v-model="ruleForm.pass" 
			    	autocomplete="off">
			    </el-input>
			  </el-form-item>  
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="handleClose">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')" class="mar-left">登 录</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "login", 
		props: {
			visibility: Boolean
		},
		data() {
			var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else { 
        	if(value !== "Beijixing"){
        		callback(new Error('请输入用户名'));
        	}else{
        		callback();
        	} 
        }
      };
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else { 
        	if(value !== "4896"){
        		callback(new Error('请输入密码'));
        	}else{
        		callback();
        	} 
          callback();
        }
      };
			return { 
				ruleForm: {
          name: '',
          pass: '',
        },
        rules: {
        	name: [
            { validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },  
        formLabelWidth: '90px',
       	nickName: ''
			} 
		},
		mounted() {
			document.addEventListener('keydown', e => {
				console.log(e.keyCode); 
				if(e.keyCode == 13) {
					this.submitForm('ruleForm');
				} 
			})
		},
		methods: {
			handleClose () { 
				this.$emit('closeLogin', false);
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        	console.log(this.$store);
          if (valid) {     
          	this.$store.dispatch('login', this.ruleForm); 
          	this.$refs[formName].resetFields();
          	this.handleClose();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
		}
	}
</script>

<style lang="less">
	.mar-left{
		margin-left: 40px !important; 
	}
</style>