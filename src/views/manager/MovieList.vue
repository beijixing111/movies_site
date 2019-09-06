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
	      prop="createTime"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="poster"
	      label="封面地址">
	      <template slot-scope="scope"> 
	        <el-popover trigger="hover" placement="top">
	          <p style="text-align: center; padding: 10px 0;">{{ scope.row.poster }}</p>
	          <div slot="reference" class="name-wrapper">
	            <el-tag size="medium" @click="handleCopyPoster(scope.row.poster)">复制地址</el-tag>
	          </div>
	        </el-popover>
      	</template>
	    </el-table-column>
	    <el-table-column
	      prop="src"
	      label="视频地址">
	      <template slot-scope="scope"> 
	        <el-popover trigger="hover" placement="top">
	          <p style="text-align: center; padding: 10px 0;">{{ scope.row.src }}</p>
	          <div slot="reference" class="name-wrapper">
	            <el-tag size="medium" @click="handleCopyMovieSrc(scope.row.src)">复制地址</el-tag>
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
	</div>
</template>

<script>
	import Axios from 'axios';
	export default {
		name: 'Movieslist',
		data() { 
			return {
				title: "视频列表",
				dataList: [],
				total: 0,
				currentPage: 1,
				loading: true, 
			}
		},
		computed: {
			tableData() {
				return "";
			}
		},
		created() {
			this.getMovieList();
		},
		methods: {
			getMovieList() {
				Axios.get("/api/list.json")
		    .then(res => {
		      console.log(res);
		      let {code, data} = res.data;
		      if(code == 1){
		        console.log(data);
		        setTimeout(() => {
		        	this.total = data.total;
			        this.dataList = data.dataList;
			        this.loading = false;
		        }, 1000); 
		      } 
		    })
		    .catch(err => {
		      console.log(err);
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
			handleCopyPoster(poster){
				console.log(poster);
			},
			handleCopyMovieSrc(src) {
				console.log(src);
			}
		}
	}
</script>

<style lang="less">
	
</style>