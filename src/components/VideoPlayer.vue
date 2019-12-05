<template>
  <div class="vjs-custom-skin">
    <video ref="videoPlayer" class='video-js ' preload="auto" controls width='640' height='280' >
    	<source :src="videoSrc" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>  
export default {
  name: "VideoPlayer",
  props: {
    poster: String,
    videoSrc: String,
  },
  data() {
    return {
      player: null, 
    }
  },
  created() { 
  },
  mounted() {  
    this.initVideo(); 
  },
  watch: {
  	videoSrc(newV, oldV) { 
      console.log(newV, oldV);
  		this.videoSrc = newV;
      this.videoPlay(newV);
		}
  }, 
  methods: {
    initVideo() { 
      let ops = {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度  
        autoplay: false,  
        muted: false,
        preload: 'auto', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
        poster: this.poster, //你的封面地址 
        sources:[{
          src: this.videoSrc,
          type: "application/x-mpegURL"
        }]
      };
      let that = this; 
      console.log(this.videoSrc);
      this.player = videojs(this.$refs.videoPlayer, 
        ops, function onPlayerReady() {
          console.log('播放器准备好了！');     
      });   

    },
  	videoPlay(src) {  
  		let data = {
        src: src,
        type: "application/x-mpegURL"
      };
      this.player.pause();
      this.player.src(data);
      this.player.load(data);
      // this.player.play(); 
  	}
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style>
  .video-js .vjs-control-bar { 
    /*background-color: rgba(81, 158, 255, 0.68);*/
    background-color: rgba(17, 17, 17, 0.81);
  }
</style>