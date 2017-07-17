import Vue from 'vue'
import * as config from './constants'
import axios from 'axios'
import api from '../api'
{{#if_eq type "Mobile"}}
import { Toast } from 'mint-ui'
Vue.prototype.$toast = Toast
{{/if_eq}}

// 定义POST请求方法response.json()
function post (action, params) {
  if (api[action] === undefined) {
    console.error(`非法的url: ${action},请在api中配置后使用`)
  }
  let url = config + api(action).url
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((response) => {
      let resp = response.body
      if (resp.status === config.SUCCESS) {
        resolve(resp)
      } else {
        let msg = resp.message
        let msgArr = []
        try {
          let m = JSON.parse(msg)
          for (let k in m) {
            msgArr.push(m[k])
          }
        } catch (e) {
          msgArr = [msg]
        }
        {{#if_eq type "Mobile"}}
        Toast('请求失败，请稍后重试')
        {{/if_eq}}
        reject(resp)
      }
    }, (error) => {
      console.log(error)
      {{#if_eq type "Mobile"}}
      Toast('请求失败，请稍后重试')
      {{/if_eq}}
      reject(error)
    })
  })
}

function formatDate (date) {
  if (!date) { return '' }
  let dateStr = date.toLocaleDateString()
  let reg = new RegExp('/', 'g')
  return dateStr.replace(reg, '-')
}

function formatFileSize (fileSize) {
  let fs = ''
  if (fileSize < 1024) {
    fs = fileSize + 'Byte'
  } else if (fileSize < 1024 * 1024 && fileSize >= 1024) {
    fs = Math.ceil(fileSize / 1024) + 'KB'
  } else {
    fs = Math.ceil(fileSize / (1024 * 1024)) + 'M'
  }
  return fs
}

function ssetItem (obj, aKey = null) {
  let key = new Date().getTime()
  if (aKey) { key = aKey }
  window.sessionStorage.setItem(key, JSON.stringify(obj))
  return key
}

function sgetItem (key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}

function lsetItem (obj, aKey = null) {
  let key = new Date().getTime()
  if (aKey) { key = aKey }
  window.localStorage.setItem(key, JSON.stringify(obj))
  return key
}

function lgetItem (key) {
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) {}
  return value
}

function srmItem (key) {
  return window.sessionStorage.removeItem(key)
}

function lrmItem (key) {
  return window.localStorage.removeItem(key)
}

function redirect (path) {
  window.location.href = path
}

function redirectHome () {
  window.location.href = '/'
}

function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.hash.substr(1).match(reg)
  console.log(r)
  if (r != null) return unescape(r[2])
  return null
}

export {
  post, formatDate, formatFileSize, ssetItem, sgetItem, lsetItem, lgetItem, srmItem, lrmItem, redirectHome, redirect, getQueryString
}
