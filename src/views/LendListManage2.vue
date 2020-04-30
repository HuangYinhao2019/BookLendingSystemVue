<template>
    <div>
        <p>
            <span>账户Id关键字搜索:
                    <el-input
                            v-model="account_search"
                            size="mini"
                            placeholder="输入账户Id关键字搜索"
                            style="width: 20%"/>
            </span>
        </p>
        <p>
            <span>图书关键字搜索:
                <el-input
                        v-model="book_search"
                        size="mini"
                        placeholder="输入图书关键字搜索"
                        style="width: 20%"/>
            </span>
        </p>
        <p>
            <span>借书人姓名关键字搜索:
                <el-input
                        v-model="user_search"
                        size="mini"
                        placeholder="输入借书人姓名关键字搜索"
                        style="width: 20%"/>
            </span>
        </p>
        <p>
            <span>只显示未归还:
                <el-switch
                        v-model="un_back"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </span>
        </p>
        <el-table
                :data="tableData.filter(data => (!book_search || data.book.name.toLowerCase().includes(book_search.toLowerCase()))
                                             && (!user_search || data.account.user_name.toString() == (user_search.toLowerCase()))
                                             && (!account_search || data.account.account_id.toString().toLowerCase().startsWith(account_search.toLowerCase()))
                                             && (!un_back || data.back_date == null))"
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
                    prop="account_id"
                    label="账户编号">
            </el-table-column>
            <el-table-column
                    prop="lend_date"
                    label="借出日期"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="back_date"
                    label="归还日期"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="book.name"
                    label="图书名称">
            </el-table-column>
            <el-table-column
                    prop="account.account_name"
                    label="账户名">
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
                account_search:'',
                book_search:'',
                user_search:'',
                un_back:false,
                tableData: []
            }
        },

        created() {
            const _this = this
            this.user_search = this.$route.query.user_name
            axios.get('http://' + (this.IPaddress) + ':8181/lendlist/findAll').then(function(resp){
                console.log(resp)
                _this.tableData = resp.data
            })
        }
    }
</script>