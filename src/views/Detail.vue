<template>
	<div class="my-video" :style="!title ? 'display: none' : ''">
		<h3 class="title">片名：{{title}}</h3>
    <div class="video-wraper vjs-custom-skin"> 
      <video id='my-video' ref="video" class='video-js ' controls preload='auto' width='640' height='264'
        data-setup='{}'>
        <source :src="playerOptions.sources.src" :type="playerOptions.sources.type">
        <p class='vjs-no-js'>
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
        </p>
      </video>
      <div class="right-info"> 
        <p>此处内容为空</p>
        <!-- <p>加载不了，点此处按钮重试一下</p> -->
        <!-- <el-button  @click="ajaxData">重试</el-button>  -->
      </div>
    </div> 
	</div>
</template>

<script> 
  import * as Apis from '../apis'; 
  import { mapActions } from 'vuex';
	export default {
		props: ["id"],
    data () {
      return {
      	title: "", 
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度  
          autoplay: false,  
          preload: 'auto', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
          poster: "", //你的封面地址
          sources: {
            type: "application/x-mpegURL",
            src: "" //url地址
          } 
        }
      }
    },
    created() {
      console.log(this.id); 
    },
    mounted() {
      console.log(this.$refs.video.id); 
      
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
            this.playerOptions.sources.src = nowArr[0].src;
            // this.playerOptions.sources.src = "https://www.mimyz.com/uploads/15E52256-234D-4C59-A4F2-58394274CE1B.MOV";
            this.playerOptions.poster = nowArr[0].poster;
            var videoId = document.getElementById("my-video");
            var source = videoId.querySelector("source");
            source.src = nowArr[0].src;
            this.$refs.video.src = nowArr[0].src;
            var player = videojs(videoId); 
            // player.play();  
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
      .right-info{
        display: flex; flex: auto;
        margin-left: 15px;
      }
    } 
	}
</style>