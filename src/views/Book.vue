<template>
    <div>
        <el-table
                :data="books"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="图书编号"
                    width="%30">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="图书名称"
                    width="%30">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="%30">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="%30">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="3"
                :total="30">
        </el-pagination>
    </div>
</template>


<script>
    export default {
        name: "Book",
        data(){
            return {
                books: [{
                    id: 1,
                    name: '',
                    author: ''
                }]
            }
        },
        created(){
            const _this = this
            axios.get('http://' + (IPaddress) + ':8181/book/findAll').then(function(resp){
                console.log(resp)
                _this.books = resp.data
            })
        }
    }
</script>

<style scoped>

</style>