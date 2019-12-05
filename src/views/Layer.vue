<template> 
  <el-container>
    <el-header>
      <my-menu />
    </el-header> 
    <el-alert v-if="message"
      class="alert-width"
      :title="message"
      @close="handleClose"
      type="warning">
    </el-alert> 
    <el-main class="clearfix"> 
      <router-view/>
    </el-main>
    <el-footer>Mimyz</el-footer>
     <my-red :ok="ok" :redpic="redSrc"></my-red>
  </el-container>  
</template>

<script>
  import MyMenu from '@/components/MyMenu';
  import FixedRed from '@/components/Redbag';
  export default {
    name: 'App', 
    data() {
      return {
        redSrc: '/static/images/red.jpg', 
        ok: true
      }
    },
    components: {
      "my-menu": MyMenu,
      "my-red": FixedRed
    },
    computed: {
      message() {
        return this.$store.state.globalMsg
      },
      getLoginStatus() {
        return this.$store.state.userInfo.loginStatus;
      }
    },
    mounted() {
      let nowhref = location.href;
      this.closeAdvertising(nowhref);
    },
    watch:{
      getLoginStatus(nelV, oldV){ 
        this.closeAdvertising(nelV);
      }
    },
    methods: {
      handleClose() {
        console.log(123);
      },
      closeAdvertising(bool) { 
        this.ok = !bool; 
      }
    }
  }
</script>
 
<style lang="less">
  body{
    background: #f5f5f5;
  }
  .el-header, .el-footer {  
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    background: #303133; color: #fff;
  }
  .el-footer{
    background: rgba(0,0,0,.2); 
    color: #333; position: fixed;
    left: 0; right: 0; bottom: 0;
  }
  .alert-width{
    width: 1200px; margin: 0 auto;
  }
  .el-main { 
    color: #333;
    min-height: 500px;
    text-align: center; 
    margin-bottom: 60px;
  }
   
  .el-message{
    background: #fff !important;
  }
  .diag-pic{
    background: #fff;
    .el-dialog__header{ 
      padding: 0;
    }
    .el-dialog__headerbtn{
      top: 5px;
      right: 5px;
      font-size: 16px;
    }
  }
  .el-message-box__btns{
    .el-button{
      margin: 0 15px;
    }
  }
</style> 
