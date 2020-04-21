<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="book_id"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="图书名">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者">
            </el-table-column>
            <el-table-column
                    prop="isbn"
                    label="ISBN">
            </el-table-column>
            <el-table-column
                    prop="language"
                    label="语言">
            </el-table-column>
            <el-table-column
                    prop="category.class_name"
                    label="分类">
            </el-table-column>
            <el-table-column
                    prop="pubdate"
                    label="出版日期">
            </el-table-column>
            <el-table-column
                    prop="left_number"
                    label="可借数量">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="show(scope.row)" type="text" size="small">查看简介</el-button>
                    <el-button @click="borrow(scope.row)" type="text" size="small">借书</el-button>
                    <!--<el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        methods:{
            show(row){
                this.$msgbox({
                    title: row.name,
                    message: row.introduction,
                    center: true
                })
            },
            borrow(row){
                const _this = this
                this.borrowRequest.book_id = row.book_id
                this.borrowRequest.account_id = this.$cookies.get("user").account_id

                console.log(this.borrowRequest)
                axios.post('http://localhost:8181/lendlist/borrow',this.borrowRequest).then(function (resp) {
                    console.log(resp)
                    if (resp.data == 'success') {
                        _this.$alert('借书成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$router.push('/BookRended')
                            }
                        })
                    }
                    else if (resp.data == 'OutOfBookNumber') {
                        _this.$alert('借书失败，书本已被借完', '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                    else if (resp.data == 'OutOfMaxRend'){
                        _this.$alert('借书失败，用户借书次数已达上限', '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                    else if (resp.data == 'AlreadyRendedThisOne'){
                        _this.$alert('有同名图书尚未归还，不可重复借', '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                })
            }
        },
        data(){
            return {
                tableData: [],
                borrowRequest:{
                    book_id:'',
                    account_id:''
                }
            }
        },
        created() {
            this.tableData = this.$route.query.tableData
        }
    }
</script>

<style scoped>

</style>