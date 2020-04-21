<template>
    <div>
        <center>
            <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="账户Id" prop="account_id">
                    <el-input v-model="ruleForm.account_id" readOnly></el-input>
                </el-form-item>

                <el-form-item label="账户名" prop="account_name">
                    <el-input v-model="ruleForm.account_name" readOnly></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="user_name">
                    <el-input v-model="ruleForm.user_name"></el-input>
                </el-form-item>

                <el-form-item label="最大可借数量" prop="max_lend_number" v-if="this.$cookies.get('user').is_admin == 1">
                    <el-input-number v-model="ruleForm.max_lend_number" :min="0" :max="100" label="最大可借数量"></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="goback">返回</el-button>
                </el-form-item>

            </el-form>
        </center>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                ruleForm: {
                    account_id:'',
                    account_name: '',
                    password: '',
                    is_admin: false,
                    user_name: '',
                    max_lend_number:0
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
            }
        },

        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8181/account/update',this.ruleForm).then(function(resp){
                            if(resp.data == 'success'){
                                _this.$alert(_this.ruleForm.account_name+' 修改成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        if (_this.$cookies.get("user").is_admin == 1) {
                                            _this.$router.push( '/AccountManage')
                                        }
                                        else {
                                            _this.$router.push('/user')
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            goback(){
                if (this.$cookies.get("user").is_admin == 1) {
                    this.$router.push( '/AccountManage')
                }
                else {
                    this.$router.push( '/user')
                }
            }
        },

        created() {
            const _this = this
            var path
            if (this.$route.query.account_id != null){
                path = this.$route.query.account_id
            }
            else {
                path = this.$cookies.get("user").account_id
            }
            axios.get('http://localhost:8181/account/findById/'+ path).then(function(resp){
                _this.ruleForm = resp.data
            })
        }

    }
</script>

<style scoped>

</style>