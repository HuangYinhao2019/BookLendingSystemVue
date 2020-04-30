<template>
    <div>
        <p>
            <span>账户Id关键字搜索:
                    <el-input
                            v-model="searchForm.account_id"
                            size="mini"
                            placeholder="输入账户Id关键字搜索"
                            style="width: 20%"/>
            </span>
        </p>
        <p>
            <span>图书关键字搜索:
                <el-input
                        v-model="searchForm.book_name"
                        size="mini"
                        placeholder="输入图书关键字搜索"
                        style="width: 20%"/>
            </span>
        </p>
        <p>
            <span>借书人姓名关键字搜索:
                <el-input
                        v-model="searchForm.user_name"
                        size="mini"
                        placeholder="输入借书人姓名关键字搜索"
                        style="width: 20%"/>
            </span>
        </p>
        <p>
            <el-button type="primary" @click="retrieval()" size="small">搜索</el-button>
        </p>
        <!--<p>-->
            <!--<span>只显示未归还:-->
                <!--<el-switch-->
                        <!--v-model="un_back"-->
                        <!--active-color="#13ce66"-->
                        <!--inactive-color="#ff4949">-->
                <!--</el-switch>-->
            <!--</span>-->
        <!--</p>-->
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
            retrieval(){
                const _this = this
                console.log(this.searchForm)
                axios.post('http://' + (IPaddress) + ':8181/lendlist/retrieval',this.searchForm).then(function(resp){
                    console.log(resp)
                    _this.tableData = resp.data
                })
            }
        },

        data() {
            return {
                pageSize:0,
                total:0,
                searchForm: {
                    account_id: '',
                    book_name: '',
                    user_name: ''
                },
                un_back:false,
                tableData: []
            }
        },

        created() {
            const _this = this
            this.searchForm.user_name = this.$route.query.user_name
            if (this.searchForm.user_name != null){
                this.retrieval()
            }
            // axios.get('http://' + (IPaddress) + ':8181/lendlist/findAll').then(function(resp){
            //     console.log(resp)
            //     _this.tableData = resp.data
            // })
        }
    }
</script>