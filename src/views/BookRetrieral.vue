<template>
    <center>
        <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="图书名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>

            <el-form-item label="ISBN" prop="isbn">
                <el-input v-model="ruleForm.isbn"></el-input>
            </el-form-item>

            <el-form-item label="语言" prop="language">
                <el-input v-model="ruleForm.language"></el-input>
            </el-form-item>

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
                <el-button type="primary" @click="Retrieral('ruleForm')">查询</el-button>
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
                    name: '',
                    author: '',
                    isbn:'',
                    language:'',
                    class_id:'',
                    pubdate:'',
                    left_number:0
                },
                category:[]
            };
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/category/findAll').then(function (resp) {
                console.log(resp)
                _this.category = resp.data
            })
        },

        methods: {
            Retrieval(formName){

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

