<template>
	<div style="padding: 20px;">
		<div>用户列表</div>
		<el-table
			v-loading="loading"
	    :data="tableData.userList"
	    size="small"
	    style="width: 100%">
	    <el-table-column
	      prop="nickName"
	      label="昵称">
	    </el-table-column>
	    <el-table-column
	      prop="mobile"
	      label="手机号" >
	    </el-table-column>
	    <el-table-column
	      prop="email"
	      label="邮箱">
	    </el-table-column>
	    <el-table-column
	      prop="createTime"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="headImg"
	      label="头像">
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
      :total="tableData.total">
    </el-pagination>
	  
	</div> 
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'usermanager',
		data() { 
			return {
				title: '',
				currentPage: 1,
				loading: true
			}
		},
		computed: {
			tableData() {
				let userList = this.$store.state.userList;
				userList = userList.map(item => { 
					item.headImg = item.headImg ? item.headImg : '暂无';
					return item;
				}) 
				if(userList.length > 0) this.loading = false;
	  		return {
	  			userList,
	  			total: userList.length
	  		};
			}
		},
		created () {
			this.getUserData();
		},
		methods: {
			...mapActions(["getUserData"]),
			handleEdit() {
				alert("编辑");
			},
			handleDelete() {
				alert("删除");
			}
		}
	}
</script>

<style lang="less">
	
</style>