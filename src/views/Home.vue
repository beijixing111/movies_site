<template>
	<div class="my-home clearfix"> 
		<movie-card :dataList="homeData.dataList" />
		<div class="clearfix"></div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { Loading } from 'element-ui';
	import MovieCard from '@/components/MovieCard';
	let loadingInstance;
	export default {
		name: "Home",
		components: {
			MovieCard
		},
	  data() {
	    return { 
	    	loading: true
	    };
	  },

	  created () { 
	    this.getHomeData();
	  },
	  computed: {
	  	homeData() { 
	  		let homeList = this.$store.state.homeList.map(item => {
					if(!item.poster) {
						item.poster = './static/images/default_movie.png';
					}
					return item;
				})
	  		console.log(this.$store.state);
	  		return {
	  			total: homeList.length,
	  			dataList: homeList
	  		}
	  	}
	  },
	  methods: {
	    ...mapActions(["getHomeData"])
	  } 
	}
</script>

<style lang="less">
	.my-home{
		width: 1200px; margin: 0 auto;
	}
  .time {
    font-size: 13px;
    color: #999;
  } 
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
 
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  p{
  	text-align: left; line-height: 20px;
  }
  .clearfix:after {
      clear: both
  }
</style>