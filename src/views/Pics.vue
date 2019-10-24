<template>
	<div class="my-home">
		<el-row :gutter="20" class="clearfix">
			  <el-col :span="6" v-for="(item, index) in picData.picList" :key="item.fileName" >
			  	<el-card class="pic-box" :body-style="{ padding: '0px' }">  
			      <el-image :src="item.fileSrc" @click="browerPic(item.fileSrc)" class="wrapper">
				      <div slot="placeholder" class="image-slot">
				        加载中<span class="dot">...</span>
				      </div>
				    </el-image>
			    </el-card>
			  </el-col>
			</el-row>
			<el-dialog 
				custom-class="diag-pic"
			  :visible.sync="dialogVisible"
			  :width="imgWidth"
			  :before-close="handleClose"> 
			  <div>
			  	<el-image :src="picSrc">
			      <div slot="placeholder" class="image-slot">
			        加载中<span class="dot">...</span>
			      </div>
			    </el-image>
			  </div> 
			</el-dialog>
	</div>
</template>

<script> 

	import { mapActions } from 'vuex';
	export default {
		name: "pics",
		components: {},
		data() {
			return {
        dialogVisible: false,
        imgWidth: "400px",
        picSrc: ''
      };
		},
		created () { 
	    this.getPicData();
	  },
	  computed: {
	  	picData() { 
	  		let picData = this.$store.state.picList.map(item => {
	  			if(!item.fileSrc) {
						item.fileSrc = './static/images/default_movie.png';
					}
					return item;
	  		}) 
	  		return {
	  			total: picData.length,
	  			picList: picData
	  		}
	  	}
	  },
	  methods: {
	    ...mapActions(["getPicData"]),
	    browerPic(src) {
	    	let image = new Image();
	    	image.onload = () => {
	    		// console.log(image.width);
	    		let wid = image.width > 1200 ? 1200 : image.width;
	    		this.imgWidth = wid + 'px';
	    		this.picSrc = src;
	    		this.dialogVisible = true;
	    	}
	    	image.src = src; 
	    },
	    handleClose() {
	    	this.dialogVisible = false;
	    }
	  } 
	}
</script>

<style lang="less">
	.my-home{
		width: 1200px; margin: 0 auto;
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
  .pic-box{
  	height: 260px; cursor: pointer;
  	overflow: hidden;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
	.el-card__body{
  	height: 260px;
  	overflow: hidden;
  	position: relative;
  	.wrapper{
			height: 100%; width: 100%;
  	}
  }	
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%; height: 300px;
    display: block;
  }
  .desc{
  	font-size: 12px;
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