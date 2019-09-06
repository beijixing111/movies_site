<template>
	<div class="about">
		<h3>关于</h3>
		<p>{{desc}}</p> 
	</div>
</template>

<script>
	export default {
		name: "about",
		data() {
			return {
				desc: "个人的学习的迷你小影院，不定期更新，维护。",
				date: "2019-09-03"
			}
		}
	}
</script>

<style lang="less">
	.about{
		width: 1200px;
		padding: 20px 0;
		margin: 0 auto;
		h3{
			text-align: center;
			font-size: 20px;
			padding: 10px 0;
		}
		p{
			text-align: left;
			text-indent: 1em;
			font-size: 16px;
		}
	}
</style>