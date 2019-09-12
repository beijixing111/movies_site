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
	      label="图片地址">
	    </el-table-column>
	    <el-table-column
	      prop="desc"
	      label="图片描述">
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
		name: 'Piclist',
		data() { 
			return {
				title: "图片列表",
				dataList: [],
				total: 0,
				currentPage: 1,
				loading: true
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
				Axios.get("/api/piclist.json")
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
			}
		}
	}
</script>

<style lang="less">
	
</style>