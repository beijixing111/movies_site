<template>
	<div v-show="ok">
		<div class="fixed-ctx fixed-rig " > 
			<p>扫码有红包和惊喜哦！</p>
			<img :src="redpic" alt="红包"> 
		</div>
		<!-- <div class="fixed-ctx fixed-le">
			<p>扫码有红包，更有惊喜哦！</p>
			<img :src="redpic" alt="红包"> 
		</div> -->
	</div> 
</template>

<script> 
	export default {
		name: "redbag",
		props: {
			ok: Boolean,
			redpic: String
		} 
	}
</script>

<style lang="less">
	.fixed-ctx{
		position: fixed; 
		top: 50%;
		transform: translateY(-50%);
		width: 150px;
		border-radius: 5px;
		background: #fff;
		&.fixed-le{
			left: 0;
		}
		&.fixed-rig{
			right: 0;
		} 
		p{
			font-size: 12px;
			text-align: center;
			padding: 10px 0;
			color: #333;
		}
		img{
			width: 100%; display: block;
		}
	}
</style>