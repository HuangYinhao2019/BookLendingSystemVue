<template>
    <el-container>
        <el-header>
            <center>
                借书系统
            </center>
        </el-header>
        <el-main>
            <center>
                <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="账号" prop="account_name">
                        <el-input v-model="ruleForm.account_name"  minlength = "6" maxlength = "12" show-word-limit></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" show-password></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="register">注册</el-button>
                    </el-form-item>

                </el-form>
            </center>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    account_name: '',
                    password: ''
                },
                rules: {
                    account_name: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$cookies.remove("user")
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://' + (this.IPaddress) + ':8181/account/submit',this.ruleForm).then(function(resp){
                            if(resp.data == 'success'){
                                axios.get('http://' + (this.IPaddress) + ':8181/account/findByName/'+(_this.ruleForm.account_name)).then(function (resp2){
                                    if (resp2.data.is_admin == 1){
                                        _this.$cookies.set("user",resp2.data, 60 * 60)
                                        _this.$router.push('/admin')
                                    }
                                    else {
                                        _this.$cookies.set("user",resp2.data, 60 * 60)
                                        _this.$router.push('/user')
                                    }
                                })
                            }
                            else if(resp.data == 'noexist'){
                                _this.$alert('用户名不存在', '登录失败', {
                                    confirmButtonText: '确定',
                                })
                            }
                            else {
                                _this.$alert('用户名或密码错误', '登录失败', {
                                    confirmButtonText: '确定',
                                })
                            }
                        })
                    }
                });
            },
            register() {
                this.$router.push('/Register');
            }
        }
    }
</script>

<style scoped>

</style>