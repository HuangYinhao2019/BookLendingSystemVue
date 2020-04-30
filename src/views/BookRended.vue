<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="lend_id"
                    label="借书编号">
            </el-table-column>
            <el-table-column
                    prop="book_id"
                    label="图书编号">
            </el-table-column>
            <el-table-column
                    prop="lend_date"
                    label="借出日期"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="book.name"
                    label="图书名称">
            </el-table-column>
            <el-table-column
                    prop="account.user_name"
                    label="借书人姓名">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="returnbook(scope.row)" type="text" size="small">还书</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        methods: {
            returnbook(row){
                const _this = this
                axios.get('http://' + (this.IPaddress) + ':8181/lendlist/returnBook/' + (row.lend_id)).then(function (resp) {
                    if (resp.data == 'success'){
                        _this.$alert('还书成功','提示',{
                            confirmButtonText: '确定',
                            callback: action => {
                                window.location.reload()
                            }
                        })
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
            var aid = this.$cookies.get("user").account_id
            axios.get('http://' + (this.IPaddress) + ':8181/lendlist/findByAccountIdRended/'+(aid)).then(function(resp){
                console.log(resp)
                _this.tableData = resp.data
            })
        }
    }
</script>