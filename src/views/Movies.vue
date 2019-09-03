<template>
	<div>
		<router-view/>
		<!-- <div class="movies-list" >电影列表</div> -->
	</div>
</template>

<script>
	export default {
		name: "moves"
	}
</script>

<style>
	.movies-list{
		border: 1px solid #ccc;
		height: 300px;
	}
</style>