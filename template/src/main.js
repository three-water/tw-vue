import Vue from 'vue'
import App from './App'
import router from './router'

// PC端配置
{{#if_eq type "PC"}}
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入vueEditor
import Vueditor from 'vueditor'
import 'vueditor/dist/css/vueditor.min.css'
// 配置vueEditor
let configE = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: '宋体, SimSun', abbr: '宋体'}, {val: '黑体, SimHei', abbr: '黑体'},
    {val: '楷体, SimKai', abbr: '楷体'}, {val: '微软雅黑, Microsoft YaHei', abbr: '微软雅黑'},
    {val: 'arial black'}, {val: 'times new roman'}, {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  emoji: [
    '1f600', '1f601', '1f602', '1f923', '1f603', '1f604', '1f605', '1f606', '1f609', '1f60a', '1f60b',
    '1f60e', '1f60d', '1f618', '1f617', '1f619', '1f61a', '263a', '1f642', '1f917', '1f914', '1f610',
    '1f611', '1f636', '1f644', '1f60f', '1f623', '1f625', '1f62e', '1f910', '1f62f', '1f62a', '1f62b',
    '1f634', '1f60c', '1f913', '1f61b', '1f61c', '1f61d', '1f924', '1f612', '1f613', '1f614', '1f615',
    '1f643', '1f911', '1f632', '2639', '1f641', '1f616', '1f61e', '1f61f', '1f624', '1f622', '1f62d',
    '1f626', '1f627', '1f628', '1f629', '1f62c', '1f630', '1f631', '1f633', '1f635', '1f621', '1f620',
    '1f607', '1f920', '1f921', '1f925', '1f637', '1f912', '1f915', '1f922', '1f927'
  ],
  lang: 'en',
  mode: 'default',
  iframePath: '',
  fileuploadUrl: this.$FILE_UPLOAD_PATH
}
Vue.use(Vueditor, configE)
{{/if_eq}}

// Mobile端配置
{{#if_eq type "Mobile"}}
import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css'
{{/if_eq}}

// 配置网络请求
import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.baseURL = Vue.HOST_SITE


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
