<template>
	<div class="fix404" :style="bgimage">
		<div class="notfound">{{errorText}} <a href="/">返回首页</a></div> 
	</div>
	
</template>

<script>
	export default {
		name: "notfound",
		data() {
			return {
				errorText: '抱歉，页面不存在啦！',
				showpic: './static/images/404.jpg'
			}
		},
		computed: {
			bgimage() {
				return {
					background: `url(${this.showpic})`,
					backgroundSize: 'cover'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.fix404{
		position: fixed; left: 0; top: 0;
		width: 100%; height: 100%;
		filter: saturate(0.5);
	}
	.notfound{
		padding: 40px 0; text-align: center;
		color: #fff; 
		a{
			padding: 5px; color: rgba(12, 244, 36, 0.81);
			display: inline-block; font-size: 24px;
			text-decoration: none;
		}
	}
</style>