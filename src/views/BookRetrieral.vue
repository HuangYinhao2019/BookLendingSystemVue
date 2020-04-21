<template>
    <center>
        <el-form style="width: 60%" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <!--<el-form-item label="图书编号" prop="book_id">-->
                <!--<el-input v-model="ruleForm.book_id"></el-input>-->
            <!--</el-form-item>-->

            <el-form-item label="图书名称" prop="book_name">
                <el-input v-model="ruleForm.book_name"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>

            <!--<el-form-item label="ISBN" prop="isbn">-->
                <!--<el-input v-model="ruleForm.isbn"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="语言" prop="language">-->
                <!--<el-input v-model="ruleForm.language"></el-input>-->
            <!--</el-form-item>-->

            <el-form-item label="分类" prop="class_id">
                <el-select v-model="ruleForm.class_id" placeholder="请选择">
                    <el-option
                            v-for="item in category"
                            :key="item.class_id"
                            :label="item.class_name"
                            :value="item.class_id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="Retrieval()">查询</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>
    </center>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    // book_id:''
                    book_name: '',
                    author: '',
                    // isbn:'',
                    // language:'',
                    class_id:''
                    // pubdate:''
                },
                category:[]
            };
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/category/findAll').then(function (resp) {
                _this.category = resp.data
            })
        },

        methods: {
            Retrieval(){
                const _this = this
                axios.post('http://localhost:8181/book/retrieval',this.ruleForm).then(function (resp) {
                    console.log(resp)
                    _this.$router.push({
                        path:"/RetrievalResult",
                        query:{
                            tableData:resp.data
                        }
                    })
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

