<template>
	<div class="my-video" >
		<h3 class="title">片名：{{!title ? '未知' : title}}</h3>
    <div class="video-wraper">  
      <div v-if="!videoSrc" class="vjs-custom-skin"> 
        <div class="video-js" style="width: 640px;height: 280px;">
          <p class="video-error" >{{videoError}}</p>
        </div>
      </div>
      <div v-else >
        <video-player :poster="poster" :videoSrc='videoSrc' /> 
      </div>
      
      <div class="right-info">  
        <div class="outlink">
          ddd
        </div>
        <div class="outlink"></div>
        <!-- <p>加载不了，点此处按钮重试一下</p> -->
        <!-- <el-button  @click="ajaxData">重试</el-button>  -->
      </div>
    </div> 
	</div>
</template>

<script> 
  import * as Apis from '../apis'; 
  import { mapActions } from 'vuex';
  import VideoPlayer from '../components/VideoPlayer.vue';
	export default {
    name: 'detail',
		props: ["id"],
    components: {
      VideoPlayer 
    },
    data () {
      return {
      	title: "",  
        poster: '',
        videoSrc: '',
        videoError: "该视频资源不存在！"
      }
    },
    created() {
      console.log(this.id); 
    },
     
    mounted() { 
      this.ajaxData();
      this.updateRoutePath(); 
      console.log( window.location.hash);
    },
    watch:{
      $route(to,from){
        console.log(this.id, to, from); 
        this.ajaxData();
      }
    },
    computed: {
       
    }, 
    methods: {
      ...mapActions(["updateRoutePath"]),
      // listen event
      ajaxData() {
        Apis.getMovieData() 
        .then(res => {
          console.log(res);
          let {code, data} = res.data;
          if(code == 1){
            console.log(data);
            this.dataList = data.dataList;
            let nowArr = this.dataList.filter(item => item.id == this.id); 
            console.log(nowArr);
            this.title = nowArr[0].name; 
            this.poster = nowArr[0].poster;
            this.videoSrc = nowArr[0].src; 
          } 
        })
      }

     
    }

	}

 
</script>

<style lang="less">
	.title{
		padding: 15px 0; color: #333;
		text-align: left; font-weight: bold;
	}
	.my-video{
		width: 1200px;
		margin: 0 auto 20px;
    .video-wraper{
      display: flex;
      justify-content: space-between; 
      .video{ 
        width: 700px; flex: none; 
        display: flex; height: 280px;
      }
      .video-error{
        color: #fff; text-align: center;
        padding-top: 100px; 
        font-size: 16px;
      }
      .right-info{
        display: flex; flex: auto;
        margin-left: 15px; border-left: 1px solid #ccc;
        .outlink{
          width: 270px; margin-right: 5px;
          padding: 5px;
          &:last-child{
            margin: 0;
          }
        }
      }
    } 
	}
</style>