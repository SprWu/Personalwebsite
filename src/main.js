// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/vuex"
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import mavonEditor from 'mavon-editor'
import imageResize from 'quill-image-resize-module';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'mavon-editor/dist/css/index.css'
import Back from "@/components/base/back";
import submit from "@/components/base/submit"

Vue.config.productionTip = false

Vue.use(elementUI)
Vue.use(mavonEditor)
Vue.component('back', Back) // 全局注册自定义组件
Vue.component('submit', submit)


Quill.register('modules/imageResize', imageResize);
Vue.use(VueQuillEditor)


Vue.config.errorHandler = (error, vm, info) => {
  console.error(error)
  console.log("错误组件： " + vm.$options.name)
  console.log("错误信息： " + info)
}

Vue.filter('formatDate', time => {
  let date = time.substr(0,10)
  let t = time.substr(11,8)
  return `${date} ${t}`
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
