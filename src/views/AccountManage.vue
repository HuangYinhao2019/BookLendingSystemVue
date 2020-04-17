<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="account_id"
                    label="账号id">
            </el-table-column>
            <el-table-column
                    prop="account_name"
                    label="账户名">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码">
            </el-table-column>
            <el-table-column
                    prop="is_admin"
                    label="是否是管理员">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="lend_list(scope.row)" type="text" size="small" v-if="scope.row.is_admin == '否'">查看借阅记录</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size= "pageSize"
                :total= "total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {

        methods: {
            edit(row) {
                if (row.is_admin == "是"){
                    this.$alert('无法修改同样是管理员的账号信息!','提示',{
                        confirmButtonText:'确定'
                    })
                }
                else {
                    this.$router.push({
                        path: '/accountupdateforadmin',
                        query: {
                            account_id: row.account_id,
                            operater:1
                        }
                    })
                }
            },
            page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/account/findAll/'+(currentPage)+'/10').then(function(resp){
                    console.log(resp)
                    _this.tableData = resp.data.list
                    _this.pageSize = resp.data.pageSize
                    _this.total = resp.data.total
                })
            },
            lend_list(row){
                this.$router.push({
                    path:"/LendListManage",
                    query:{
                        user_name:row.user_name
                    }
                })
            }
        },

        data() {
            return {
                pageSize:0,
                total:0,
                tableData: []
            }
        },

        created() {
            const _this = this
            axios.get('http://localhost:8181/account/findAll/0/10').then(function(resp){
                console.log(resp)
                _this.tableData = resp.data.list
                var i;
                for (i = 0; i < _this.tableData.length; i++) {
                    _this.tableData[i].is_admin = _this.tableData[i].is_admin == 1 ? "是" : "否";
                }
                _this.pageSize = resp.data.pageSize
                _this.total = resp.data.total
            })
        }

    }

</script>

<style scoped>

</style>