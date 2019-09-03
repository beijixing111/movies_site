<template>
  <div id="app"> 
    <el-container>
      <el-header>
        <my-menu />
      </el-header>
      <el-main class="clearfix"> 
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
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
    }
  }
</script>
 
<style>
  .el-header, .el-footer {  
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    background: #303133; color: #fff;
  }
  .el-footer{
    background: #f5f5f5; color: #333;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    min-height: 500px;
    text-align: center; 
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
    
</style> 
