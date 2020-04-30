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

            <el-form-item label="出版日期" prop="pubdate">
                <el-date-picker
                        v-model="ruleForm.pubdate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="简介" prop="introduction">
                <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
            </el-form-item>

            <el-form-item label="可借数量" prop="left_number">
                <el-input-number v-model="ruleForm.left_number" :min="0" :max="100" label="可借数量"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    },
                    name: '',
                    author: '',
                    isbn:'',
                    language:'',
                    introduction:'',
                    class_id:'',
                    pubdate:'',
                    left_number:0
                },
                category:[],
                rules: {
                    name: [
                        { required: true, message: '图书名称不能为空', trigger: 'blur' }
                    ],
                    author:[
                        { required: true, message: '作者不能为空', trigger: 'blur' }
                    ],
                    isbn:[
                        { min: 13, max: 13, message:'ISBN需要输入13位', trigger: 'blur'}
                    ],
                    class_id:[
                        { required: true, message: '请选择图书类别', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            const _this = this
            axios.get('http://' + (this.IPaddress) + ':8181/category/findAll').then(function (resp) {
                console.log(resp)
                _this.category = resp.data
            })
        },

        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://' + (this.IPaddress) + ':8181/book/save',this.ruleForm).then(function(resp){
                            if(resp.data == 'success'){
                                _this.$alert('《'+_this.ruleForm.name+'》添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/BookManage')
                                    }
                                })
                            }
                            else {
                                _this.$alert('添加失败，ISBN已存在！','警告',{
                                    confirmButtonText: '确定'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

