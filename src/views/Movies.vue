<template>
	<div>
		<router-view/>
		<div class="my-home" >
			<movie-card :dataList="movieData.dataList" />
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { Loading } from 'element-ui';
	import MovieCard from '@/components/MovieCard';
	let loadingInstance;
	export default {
		name: "Movies",
		components: {
			MovieCard
		},
	  data() {
	    return { 
	    	loading: true
	    };
	  }, 
	  created () { 
	    this.getMovieData();
	  },
	  computed: {
	  	movieData() { 
	  		let movieList = this.$store.state.movieList
	  		console.log(this.$store.state);
	  		return {
	  			total: movieList.length,
	  			dataList: movieList
	  		}
	  	}
	  },
	  methods: {
	    ...mapActions(["getMovieData"])
	  } 
	}
</script>

<style lang="less">
	.my-home{
		width: 1200px; margin: 0 auto;
	}
	.movies-list{
		border: 1px solid #ccc;
		height: 300px;
	}
	.my-home{
		width: 1200px; margin: 0 auto;
	}
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-col{
  	border-radius: 4px; margin-bottom: 20px;
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