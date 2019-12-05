<template>
	<div>
		<!-- <router-view v-if="isRouterAlive" /> -->
		<router-view />
		<div class="my-home" >
			<movie-card :dataList="movieData.dataList" />
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { Loading } from 'element-ui';
	import MovieCard from '@/components/MovieCard'; 
	export default {
		name: "Movies",
		components: {
			MovieCard
		}, 
	  data() {
	    return { 
				loading: true, 
	    };
	  },  
	  created () { 
			this.getMovieData();
			console.log(this.$router.history.current.params);
	  },
	  watch:{
      $route(to,from){
        this.getMovieData(); 
      }
    },
	  computed: {
	  	movieData() { 
	  		let id = this.$router.history.current.params.id;
	  		console.log('AAAAAA', id);
	  		let movieList = this.$store.state.movieList;
	  		if(id) {
	  			movieList = movieList.filter(item => item.id != id); 
	  		} 
				movieList = movieList.map(item => { 
					item.poster = !!item.poster ? item.poster : './static/images/default_movie.png'; 
					return item;
				}); 
	  		return {
	  			total: movieList.length,
	  			dataList: movieList
	  		}
	  	} 
	  },
	  methods: {
			...mapActions(["getMovieData"]), 
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