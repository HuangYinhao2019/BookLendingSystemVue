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
                    label="可借数量"
                    sortable>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="show(scope.row)" type="text" size="small">查看简介</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
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
            deleteBook(row){
                const _this = this
                axios.delete('http://' + (IPaddress) + ':8181/book/deleteById/'+row.book_id).then(function(resp){
                    _this.$alert('《'+row.name+'》删除成功！', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.location.reload()
                        }
                    })
                })
            },
            edit(row) {
                this.$router.push({
                    path: '/bookupdate',
                    query:{
                        book_id:row.book_id
                    }
                })
            },
            page(currentPage){
                const _this = this
                axios.get('http://' + (IPaddress) + ':8181/book/findAll/'+(currentPage)+'/10').then(function(resp){
                    _this.tableData = resp.data.list
                    _this.pageSize = resp.data.pageSize
                    _this.total = resp.data.total
                })
            },
            show(row){
                this.$msgbox({
                    title: row.name,
                    message: row.introduction,
                    center: true
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
            axios.get('http://' + (IPaddress) + ':8181/book/findAll/0/10').then(function(resp){
                console.log(resp)
                _this.tableData = resp.data.list
                _this.pageSize = resp.data.pageSize
                _this.total = resp.data.total
            })
        }
    }
</script>