<template>
	<div class="about">
		<h3>关于</h3>
		<p>{{desc}}</p> 
		<button class="ripple" type="button" > 
			<span>小测试</span>
		</button>
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
	.ripple{
		display: inline-block;
		width: 100px;
		height: 40px;
		line-height: 40px;
		outline: none; 
		border: none; 
		cursor: pointer;
		user-select: none;
		text-align: center;
		background: rgba(246, 141, 36, 0.87);
		color: #fff;
		position: relative;
		border-radius: 20px; 
		box-shadow: 0 5px 10px 0 rgba(246, 141, 36, 0.87);
		overflow: hidden; 
		&:hover{
			top: -1px;
			background: rgba(244, 131, 17, 0.87);
			box-shadow: 0 5px 13px 0 rgba(246, 141, 36, 0.87);
		}
		&:after{
			content: '';
			position: absolute;
			width: 200px;
			height: 200px;
			background: rgba(0,0,0,.25);
			border-radius: 50%;
			left: 50%;
			top: 50%;
			opacity: 0;
			transition: all 0.8s;
			transform: translate(-50%, -50%);
		} 
		&:active{
			background: rgba(246, 141, 36, 0.87);
			top: 0;
			box-shadow: 0 5px 10px 0 rgba(246, 141, 36, 0.87);
		}
		&:active:after{
			width: 0;
			height: 0;
			opacity: 1;
			transition-duration: 0s;
		}
	}
 
</style>