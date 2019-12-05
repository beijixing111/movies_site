<template> 
	<div style="padding: 20px;">
		<div class="page-title">
			<div class=""> {{title}}</div>
			<div class="right"> 
				<el-input placeholder="请输入内容" v-model="searchType" class="input-with-select">
			    <el-button slot="append" icon="el-icon-search" @click="handleRefresh"></el-button>
			  </el-input>
			</div>
		</div>
		<el-table
			v-loading="loading"
	    :data="dataList"
	    size="small"
	    style="width: 100%">
	    <el-table-column
	      prop="name"
	      label="电影名">
	    </el-table-column>
	    <el-table-column
	      prop="owner"
	      label="导演" >
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型">
	    </el-table-column>
	    <el-table-column
	      prop="uploadTime"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="poster"
	      label="封面地址">
	      <template slot-scope="scope"> 
	        <el-popover trigger="hover" placement="top">
	          <p style="text-align: center; padding: 10px 0;">{{ scope.row.posterAdr }}</p>
	          <div slot="reference" class="name-wrapper" style="position: relative;">
	          	<input :id="'poster' + scope.row.id" 
	          	:value="scope.row.posterAdr" style="position: absolute; top: -50px;"/>
	            <el-tag size="medium" @click="handleCopyPoster(scope.row)">复制地址</el-tag>
	          </div>
	        </el-popover>
      	</template>
	    </el-table-column>
	    <el-table-column
	      prop="src"
	      label="视频地址">
	      <template slot-scope="scope"> 
	        <el-popover trigger="hover" placement="top">
	          <p style="text-align: center; padding: 10px 0;">{{ scope.row.srcAdr }}</p> 
	          <div slot="reference" class="name-wrapper" style="position: relative;">
	          	<input :id="'video' + scope.row.id" 
	          	:value="scope.row.srcAdr" style="position: absolute; top: -50px;" />
	            <el-tag size="medium" @click="handleCopyMovieSrc(scope.row)">复制地址</el-tag>
	          </div>
	        </el-popover>
      	</template>
	    </el-table-column>
	    <el-table-column label="操作" width="180" style="text-align: right;">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
     
		<el-dialog title="编辑电影信息" :visible.sync="dialogTableVisible">
		  <el-form :model="form">
		  	<div style="margin-bottom: 10px;">
		  		<el-input v-model="form.name" autocomplete="off" placeholder="电影名称"></el-input>
		  	</div>
		   	<div style="margin-bottom: 10px;">
		   		<el-input v-model="form.owner" autocomplete="off" placeholder="导演名称"></el-input>
		   	</div>
		    
		    <div style="margin-bottom: 10px;">
		    	 <el-input v-model="form.type" autocomplete="off" placeholder="电影类型"></el-input>
		    </div>  
		    <div style="margin-bottom: 10px;">
		    	<el-input v-model="form.poster" autocomplete="off" placeholder="封面地址"></el-input> 
		    </div> 
		    <div style="margin-bottom: 10px;">
		    	<el-input v-model="form.src" autocomplete="off" placeholder="视频地址"></el-input> 
		    </div> 
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogTableVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script> 
	import timeFormat from '@/utils/timeFormat.js';
	import * as Apis from '@/apis'; 
	export default {
		name: 'Movieslist',
		data() { 
			return {
				title: "视频列表",
				dataList: [],
				total: 0,
				currentPage: 1,
				loading: true,
				dialogTableVisible: false,
				form: {
					id: '',
					name: '',
					owner: '',
					type: '',
					poster: '',
					src: ''
				},
				searchType: ''
			}
		},
		computed: {
			// tableData() { 
			// 	let dataList = [];
			// 	return dataList = this.dataList.map(item => {
			// 		console.log(item);
			// 		item.uploadTime = timeFormat(item.uploadTime);
			// 		// if(item.poster.indexOf("http") < 0 || item.poster.indexOf("localhost") < 0) {
		 //   //    	item.poster = `${location.hostname}:${location.port}${item.poster.replace('./', '/')}`;	
		 //   //    }
		 //   //    // console.log(item);
		 //   //    if(item.src.indexOf("http") < 0 || item.src.indexOf("localhost") < 0) { 
		 //   //    	item.src = `${location.hostname}:${location.port}${item.src.replace('./', '/')}`;	
		 //   //    }
			// 	  // console.log(item); 
			// 		return item;
			// 	})
			// }
		},
		created() {
			this.getMovieList();
		},
		methods: {
			getMovieList() {
				Apis.getMovieData()
		    .then(res => {
		      console.log(res);
		      let {code, data} = res.data;
		      if(code == 1){
		        this.total = data.total;
		        this.dataList = data.dataList.map(item => {
		        	item.uploadTime = timeFormat(item.uploadTime); 
		        	if(!!item.poster) { 
		        		if(item.poster.indexOf('http') < 0){
		        			item.posterAdr = `${location.hostname}:${location.port}${item.poster.replace('./', '/')}`;
		        		}else{
		        			item.posterAdr = item.poster;
		        		}
		        	}
		        	if(!!item.src) {  
		        		if(item.src.indexOf('http') < 0){
		        			item.srcAdr = `${location.hostname}:${location.port}${item.src.replace('./', '/')}`;
		        		}else{
		        			item.srcAdr = item.src;
		        		} 
		        	}
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
				this.getMovieList();
			},
			handleSizeChange() {
				console.log("pageSize");
			},
			handleCurrentChange() {
				console.log("page");
			},
			handleCopyPoster(row){
				console.log(poster);
			},
			handleCopyMovieSrc(row) { 
	      let input = document.getElementById("video" + row.id); 
	      input.select(); // 选中文本
	      console.log(input.value);
	      document.execCommand("copy"); // 执行浏览器复制命令
	      console.log("复制成功");
			},
			handleEdit(index, row) {
				console.log(row);
				this.dialogTableVisible = true;
				this.form = JSON.parse(JSON.stringify(row)); 
			},
			handleEditSubmit() {  
				Apis.putMovieData(this.form)
		    .then(res => {
		      console.log(res);
		      let {code, data, msg} = res.data;
		      if(code == 1){
		        console.log(data); 
		        this.form = {
							id: '',
							name: '',
							owner: '',
							type: '',
							poster: '',
							src: ''
						};
		        this.dialogTableVisible = false;
		        this.$message({
			    		message: msg,
	          	type: 'success'
			    	});
			    	this.handleRefresh();
		      }else{
		      	this.$message.error(msg);
		      }  
		    })
		    .catch(err => {
		    	this.$message.error("出现错误！"); 
		    })
			},
			handleDelete(index, row) {
				// this.$message("暂不支持！"); 
				console.log(row); 
				this.$confirm('确定要删除么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
        	Apis.deleteMovieData({id: row.id})
					.then(res => {
						console.log(res);
						let { code, msg } = res.data;
						this.$message.success(msg); 
						this.handleRefresh();
					})
					.catch(err => {
						this.$message.error("出现错误！"); 
					})
        })
				
			}
		}
	}
</script>

<style lang="less">
	
</style>