import App from './App'

// 第三方request请求函数
import { $http } from '@escook/request-miniprogram'
// 挂载到uni
uni.$http = $http
// 设置baseUrl
$http.baseUrl = "https://www.uinav.com"
// 请求之前doing
$http.beforeRequest = function(options){
  uni.showLoading({
    title: "数据加载中..."
  })
}
// 请求之后的doing
$http.afterRequest = function(options){
  uni.hideLoading()
}
// 封装showMsg方法
uni.$showMsg = function(title="数据加载失败！",duration = 1500){
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif