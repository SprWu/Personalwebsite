// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/vuex"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.config.errorHandler = (error, vm, info) => {
  console.error(error)
  console.log("错误组件： " + vm.$options.name)
  console.log("错误信息： " + info)
}

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>',
  store,
}).$mount('#app')
