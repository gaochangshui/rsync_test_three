import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard', icon: 'home' }
    }, {
      path: 'gitlabmanager',
      name: 'GitLabManager',
      component: () => import('@/views/gitlabmanager/index.vue'),
      meta: { title: 'GitLabManager', icon: 'user' }
    }],
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  var allCookie = document.cookie
  var userCD=''
     var aryCookie =allCookie.split(';')
     for(let i in aryCookie){
       let getUserid=aryCookie[i].split("=")
        if(getUserid[0]==' LoginedUser'){
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
