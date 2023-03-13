import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import operate from "./utils/operate"
import './assets/main.css'
import element from 'element-plus';
import 'element-plus/dist/index.css'
import store from './stores' // 引入store
const app = createApp(App)

app.use(store)
app.use(router)
app.use(element)
app.config.globalProperties.$operate = operate
app.mount('#app')
//导航守卫 路由跳转前触发
router.beforeEach((to,from,next) => {
  //去登录页面时无需校验
  console.log(to.path !== "/login")
  if (to.path !== "/login"){
      //校验用户登录信息
      let token = operate.getCookie('accessToken');
      if (token === undefined || token === "" || token === null){
          next("/login");
      }else next();
  }else next()
})