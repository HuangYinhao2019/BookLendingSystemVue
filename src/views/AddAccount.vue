<template>
    <center>
        <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="账户名" prop="account_name">
                <el-input v-model="ruleForm.account_name"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="是否为管理员">
                <el-switch
                        v-model="ruleForm.is_admin"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>

            <el-form-item label="姓名" prop="user_name">
                <el-input v-model="ruleForm.user_name"></el-input>
            </el-form-item>

            <el-form-item label="最大可借数量" prop="max_lend_number">
                <el-input-number v-model="ruleForm.max_lend_number" :min="0" :max="100" label="最大可借数量"></el-input-number>
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
                    account_name: '',
                    password: '',
                    is_admin: false,
                    user_name: '',
                    max_lend_number: 0,
                    left_lend_number: 0
                },
                rules: {
                    account_name: [
                        { required: true, message: '账号不能为空', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ]
                }
            };
        },

        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.is_admin == true){
                            this.ruleForm.is_admin = 1;
                        }
                        else {
                            this.ruleForm.is_admin = 0;
                        }
                        this.ruleForm.left_lend_number = this.ruleForm.max_lend_number
                        axios.post('http://localhost:8181/account/save',this.ruleForm).then(function(resp){
                            if(resp.data == 'success'){
                                _this.$alert(_this.ruleForm.account_name+' 添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/AccountManage')
                                    }
                                })
                            }
                            else {
                                _this.$alert(_this.ruleForm.account_name+' 账户名已存在！', '消息', {
                                    confirmButtonText: '确定',
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

