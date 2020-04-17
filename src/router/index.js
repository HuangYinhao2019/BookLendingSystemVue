import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from '../views/BookManage'
import AddBook from '../views/AddBook'
import Index from '../views/Index'
import BookUpdate from '../views/BookUpdate'
import Admin from '../views/Admin'
import AccountRegister from '../views/AccountRegister'
import AccountManage from "../views/AccountManage";
import AddAccount from "../views/AddAccount";
import AccountUpdate from "../views/AccountUpdate";
import User from "../views/User"
import BookSearch from "../views/BookSearch";
import LendListManage from "../views/LendListManage";
import BookRecord from "../views/BookRecord";
import BookRended from "../views/BookRended";

Vue.use(VueRouter)

const routes = [

  {
    path:"/Admin",
    name:"图书管理",
    component:Admin,
    redirect:"/BookManage",
    adminshow:true,
    children:[
      {
        path:"/BookManage",
        name:"查询图书",
        adminshow:true,
        component:BookManage
      },
      {
        path:"/AddBook",
        name:"添加图书",
        adminshow:true,
        component:AddBook
      },
      {
        path:'/BookUpdate',
        component:BookUpdate,
        adminshow:false
      }

    ]
  },

  {
    path:"/Admin",
    name:"账号管理",
    component:Admin,
    adminshow:true,
    redirect:"/AccountManage",
    children: [
      {
        path:"/accountmanage",
        name:"查询账户",
        adminshow:true,
        component:AccountManage
      },
      {
        path:"/addaccount",
        name:"添加账户",
        adminshow:true,
        component:AddAccount
      },
      {
        path:'/AccountUpdateForAdmin',
        component:AccountUpdate,
        adminshow:false
      }
    ]

  },

  {
    path:"/Admin",
    name:"借书记录管理",
    component:Admin,
    adminshow:true,
    redirect:"/LendListManage",
    children: [
      {
        path:"/LendListManage",
        name:"查询借书记录",
        adminshow:true,
        component:LendListManage
      }
    ]
  },

  {
    path:'/user',
    name:'用户操作',
    component:User,
    redirect:'/BookSearch',
    usershow:true,
    children:[
      {
        path:'/BookSearch',
        name:'图书查询',
        component:BookSearch,
        usershow:true
      },
      {
        path:'/BookRended',
        name:'已借图书',
        component:BookRended,
        usershow:true
      },
      {
        path:'/BookRecord',
        name:'借阅历史记录',
        component:BookRecord,
        usershow:true
      },
      {
        path:'/AccountUpdateForUser',
        component:AccountUpdate,
        usershow:false
      }
    ]
  },

  {
    path:"/",
    redirect: "/index"
  },

  {
    path:"/register",
    name:"注册",
    component:AccountRegister
  },

  {
    path:"/index",
    name:"图书管理系统",
    component:Index
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
