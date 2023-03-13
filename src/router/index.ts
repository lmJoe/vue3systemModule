import * as VueRouter from 'vue-router'
const routes: Array<VueRouter.RouteRecordRaw> = [
  { path: '/login', name: 'login',  component: () => import('/src/views/Login.vue') },
  { path: '/', redirect: '/HomeView'},
  { path: '/HomeView', name: 'HomeView',  component: () => import('/src/views/HomeView.vue') },
  { path: '/appSurvey', name: 'appSurvey',  component: () => import('/src/views/erlangs/appSurvey.vue') },
  
  
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})
export default router;