import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'page',
    component: Layout,
    redirect: 'gitlabmanager',
    children: [
      {
        path:'dashboard/warehousepage',
        name:'查看仓库',
        component: () => import('@/views/dashboard/warehousepage.vue'),
      },{
      // path: 'dashboard',
      // name: '项目',
      // component: () => import('@/views/dashboard/index.vue'),
      // meta: { title: '项目', icon: 'home' },
      // },{
        path: 'gitlabmanager',
        name: '代码仓库',
        component: () => import('@/views/gitlabmanager/index.vue'),
        meta: { title: '代码仓库、评审、配置', icon: 'code',name:'代码' }
      }
    ],
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'Example',
      icon: 'table'
    },
    component: () => import('../views/AboutView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  var allCookie = document.cookie
  var userCD=''
     var aryCookie =allCookie.split(';')
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split("=")
        if(getUserid[0].trim()=='LoginedUser'){
           userCD=getUserid[1]                       
        }
     }
     if(to.path==='/login'){
       next()
     }else{
      if(userCD =='') next('/login')  
     else next()
     }
     
     
})
export default router
