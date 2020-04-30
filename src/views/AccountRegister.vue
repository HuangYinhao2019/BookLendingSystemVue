<template>
    <div>
        <el-container>
            <el-header>
                <el-page-header @back="goBack" content="账号注册页面">
                </el-page-header>
            </el-header>
            <el-main>
                <center>
                    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="account_name">
                            <el-input type="text" v-model="ruleForm.account_name"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="ruleForm.password"></el-input>
                        </el-form-item>

                        <el-form-item label="姓名" prop="user_name">
                            <el-input type="test" v-model="ruleForm.user_name"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </center>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    account_name: '',
                    password: '',
                    is_admin: 0,
                    user_name:'',
                    max_lend_number: 2,
                    left_lend_number: 2
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
                        axios.post('http://' + (this.IPaddress) + ':8181/account/register',this.ruleForm).then(function (resp) {
                            console.log(resp)
                            if (resp.data == 'success') {
                                _this.$alert('注册成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/index')
                                    }
                                })
                            }
                            else {
                                _this.$alert('该账号已被注册！请重试','消息',{
                                    confirmButtonText: '确定'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            goBack() {
                this.$router.push('/index');
            }
        }
    }
</script>

<style scoped>
    el-header{
        background-color: #FFFFFF;
        color: #222;
        text-align: center;
        line-height: 60px;
    }

    el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

</style>