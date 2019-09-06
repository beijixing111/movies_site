<template>
  <div id="app"> 
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
      <el-footer>迷你影院</el-footer>
    </el-container> 
    <my-red :ok="ok" :redpic="redSrc"></my-red>
  </div>
</template>

<script>
  import MyMenu from '@/components/MyMenu';
  import FixedRed from '@/components/Redbag';
  export default {
    name: 'App', 
    data() {
      return {
        redSrc: '/static/images/red.jpg', 
        ok: false
      }
    },
    components: {
      "my-menu": MyMenu,
      "my-red": FixedRed
    },
    computed: {
      message() {
        return this.$store.state.globalMsg
      }
    },
    methods: {
      handleClose() {
        console.log(123);
      }
    }
  }
</script>
 
<style>
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
    background: #ccc; color: #333;
  }
  .alert-width{
    width: 1200px; margin: 0 auto;
  }
  .el-main { 
    color: #333;
    min-height: 500px;
    text-align: center; 
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-message{
    background: #fff !important;
  } 
</style> 
