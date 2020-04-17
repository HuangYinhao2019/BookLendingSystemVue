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
        </el-table>

    </div>
</template>

<script>
    export default {
        methods: {

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
            axios.get('http://localhost:8181/lendlist/findByAccountIdHistory/'+(aid)).then(function(resp){
                console.log(resp)
                _this.tableData = resp.data
            })
        }
    }
</script>