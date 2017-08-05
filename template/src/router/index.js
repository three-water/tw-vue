import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Hello = resolve => require(['../pages/Hello'], resolve)

let routes = [
  { name: 'Hello', path: '/', component: Hello }
]

let router = new Router({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 打开新页面时，滚动到页面顶部
  window.scrollTo(0, 0)
  // 判断非登录页面，是否已登录
  let token = window.sessionStorage.getItem('token')
  if (!token || token === 'null') {
    if (to.name !== 'SignIn') {
      return next({
        name: 'SignIn'
      })
    }
  }
  // 其他页面则正常跳转
  next()
})

export default router
