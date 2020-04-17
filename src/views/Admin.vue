<template>
    <div id="app" style="height: 1000px">

        <el-row :gutter="180">
            <el-col :span="4">
                <el-page-header @back="goBack" content="管理员界面" style="margin-top: 10px; width: 300px">
                </el-page-header>
            </el-col>
            <el-col :span="8" style="margin-top: 11px">
                <span>欢迎，</span><label v-text="this.$cookies.get('user').user_name"></label>
            </el-col>
            <el-col :span="4" :offset="7">
                <el-button @click="personalInfo()" type="info" icon="el-icon-user">个人信息</el-button>
            </el-col>
        </el-row>

        <el-container style="height: 700px; border: 1px solid #eee; margin-top: 30px">

            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['0', '1', '2']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.adminshow">
                        <template slot="title">{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" v-if="item2.adminshow"
                                      :class="$route.path==item2.path?'is-active':''" >{{item2.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main style="height: 800px">
                <router-view></router-view>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user_name:'',
                account_id:''
            }
        },
        methods: {
            goBack() {
                this.$router.push('/index');
            },
            personalInfo(){
                this.$router.push('/AccountUpdateForAdmin')
            }
        }

    };
</script>
