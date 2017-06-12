import Vue from 'vue'
import App from './App'
import router from './router'

{{#if_eq type "PC"}}
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

{{/if_eq}}
// 配置网络请求
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.baseURL = Vue.HOST_SITE

import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css'

// 配置应用全局方法与变量
import config from './config'
Vue.use(config)

// 配置网络请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
Vue.http.options.root = Vue.HOST_SITE

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
