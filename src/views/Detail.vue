<template>
	<div class="my-video" :style="!title ? 'display: none' : ''">
		<h3 class="title">片名：{{title}}</h3>
    <div class="video-wraper">
      <video-player
          class="video video-player vjs-custom-skin"
          ref="videoPlayer" 
          :playsinline="true" 
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)" 
          @loadeddata="onPlayerLoadeddata($event)" 
          @canplay="onPlayerCanplay($event)"  
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied">
        > 
      </video-player>
      <!-- 
         @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @timeupdate="onPlayerTimeupdate($event)"
       -->
      <div class="right-info">
         暂无信息
      </div>
    </div> 
	</div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';
  import Axios from 'axios';
  require('../../node_modules/video.js/dist/video-js.min.css'); 
  require('../../node_modules/vue-video-player/src/custom-theme.css'); 
	export default {
		props: ["id"],
    data () {
      return {
      	title: "", 
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度  
          autoplay: false,  
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持） 
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
          sources: [{
            type: "video/mp4",
            src: "" //url地址
          }],
          poster: "", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
 
        }
      }
    },
    components: {
      videoPlayer
    },
    created() {
      console.log(this.id);
      Axios.get("/api/list.json")
        .then(res => {
          console.log(res);
          let {code, data} = res.data;
          if(code == 1){
            console.log(data);
            this.dataList = data.dataList;
            let nowArr = this.dataList.filter(item => item.id == this.id); 
            console.log(nowArr);
            this.title = nowArr[0].name;
            this.playerOptions.sources[0].src = nowArr[0].src;
            this.playerOptions.poster = nowArr[0].poster;
          } 
        })
        .catch(err => {
          console.log(err);
        })
       
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },

    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      }, 
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      onPlayerLoadeddata(player) {
        console.log("player");
      },
      onPlayerCanplay() {

      },
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
	}

 
</script>

<style lang="less">
	.title{
		padding: 15px 0; color: #333;
		text-align: left; 
	}
	.my-video{
		width: 1200px;
		margin: 0 auto 20px;
    .video-wraper{
      display: flex;
      justify-content: space-between; 
      .video{ 
        width: 700px; flex: none; 
        display: flex; 
      }
      .right-info{
        display: flex; flex: auto;
        margin-left: 15px;
      }
    }
	}
</style>