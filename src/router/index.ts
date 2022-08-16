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
    redirect: 'project',
    children: [
      {
        path:'project',
        name:'项目',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '项目', icon: 'home' },
      },
      {
        path:'dashboard/warehousepage',
        name:'查看仓库',
        component: () => import('@/views/dashboard/warehousepage.vue'),
      },{
        path: 'virtualmachine',
        name: '虚拟机',
        component: () => import('@/views/virtualmachine/index.vue'),
        meta: { title: '虚拟机', icon: 'xuniji' },
      },{
        path: 'code',
        name: '代码仓库',
        component: () => import('@/views/gitlabmanager/index.vue'),
        meta: { title: '代码仓库、评审、配置', icon: 'code',name:'代码' }
      // },{
      //   path: 'package',
      //   name: '资源包管理',
      //   component: () => import('@/views/package/index.vue'),
      //   meta: { title: '资源包管理', icon: 'package' },
      },
      {
        path: 'Scheduled',
        component: () => import('@/views/mandaysreport/Scheduled.vue'),
        name: '成员预定',
        meta: { title: '成员预定', icon: 'table' }
      },
      {
        path: 'TakenTime',
        component: () => import('@/views/mandaysreport/TakenTime.vue'),
        name: '消耗工时',
        meta: { title: '消耗工时', icon: 'link' }
      }
    ],
  },
  {
    path: '/employeeMandays',
    name: 'EmployeeMandays',
    component: () => import('../views/mandaysreport/children/EmployeeMandays.vue')
  },
  {
    path: '/projectMandays',
    name: 'ProjectMandays',
    component: () => import('../views/mandaysreport/children/ProjectMandays.vue')
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
  const allCookie = document.cookie
  let userCD=''
     const aryCookie =allCookie.split(';')
     for(const i in aryCookie){
       const getUserid=aryCookie[i].split("=")
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
