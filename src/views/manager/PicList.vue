<template> 
	<div style="padding: 20px;">
		<div class="page-title">
			<div class="">
				{{title}}
			</div>
			<div class="right">
				<el-button type="primary" 
					icon="el-icon-refresh" 
					@click="handleRefresh"
					circle>
				</el-button>
			</div>
		</div>
		<el-table
			v-loading="loading"
	    :data="dataList"
	    size="small"
	    style="width: 100%">
	    <el-table-column
	    	width="140px"
	      prop="fileName"
	      label="文件名">
	    </el-table-column>
	    <el-table-column
	      prop="putTime"
	      label="上传时间" >
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型">
	    </el-table-column>
	    <el-table-column
	      prop="fsize"
	      label="大小">
	    </el-table-column>
	    <el-table-column
	      prop="uploader"
	      label="上传者">
	    </el-table-column>
	    <el-table-column
	      prop="desc"
	      label="描述">
	    </el-table-column>
	    <!-- <el-table-column
	      prop="fileSrc"
	      label="图片地址">
	    </el-table-column> --> 
	    <el-table-column label="操作" width="180" style="text-align: right;">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleView(scope.$index, scope.row)">查看</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 20, 30, 50]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
	import Axios from 'axios';
	import timeFormat from '../../utils/timeFormat.js';
	let options = {
		"1": "美图",
		"2": "壁纸",
		"3": "萌宠",
		"4": "美女"
	};	
	export default {
		name: 'Piclist',
		data() { 
			return {
				title: "图片列表",
				dataList: [],
				total: 0,
				currentPage: 1,
				loading: true,
				dialogVisible: false,
        imgWidth: "400px",
        picSrc: ''
			}
		},
		computed: {
			tableData() {
				return "";
			}
		},
		created() {
			this.getPicList();
		},
		methods: {
			getPicList() {
				Axios.get("/api/pic")
		    .then(res => {
		      console.log(res);
		      let {code, data} = res.data;
		      if(code == 1){
		        console.log(data); 
	        	this.total = data.total;
		        this.dataList = data.dataList.map(item => {
		        	item.putTime = timeFormat(item.putTime);
		        	item.type = options[item.type];
		        	return item;
		        });
		        this.loading = false; 
		      } 
		    })
		    .catch(err => {
		      console.log(err);
		      this.loading = false;
		    }) 
			},
			handleRefresh() {
				this.loading = true;
				this.getPicList();
			},
			handleSizeChange() {
				console.log("pageSize");
			},
			handleCurrentChange() {
				console.log("page");
			},
			handleView(i, row) {
				console.log(row);
	    	let image = new Image();
	    	image.onload = () => {
	    		// console.log(image.width);
	    		let wid = image.width > 800 ? 800 : image.width;
	    		this.imgWidth = wid + 'px';
	    		this.picSrc = row.fileSrc;
	    		this.dialogVisible = true;
	    	}
	    	image.src = row.fileSrc; 
	    },
	    handleClose() {
	    	this.dialogVisible = false;
	    },
			handleDelete(i, row) {
				console.log(row);
				this.$confirm('确定要删除此图片信息么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          Axios.delete(`/api/pic?fileName=${row.fileName}`)
			    .then(res => {
			      console.log(res);
			      this.$message({
	            type: 'success',
	            message: '删除成功！'
	          });
	          this.handleRefresh();
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消！'
	          }); 
          });         
        });
			}
		}
	}
</script>

<style lang="less">
	
</style>