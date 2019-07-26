import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/base/layout"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'board',
      component: Layout,
      redirect: '/index',
      children: [{
        path: '/index',
        name: 'index',
        component: () => import('@/components/index/index')
      }]
    },
    {
      path: '/message',
      name: 'message',
      component: Layout,
      children: [{
        path: '/message/index',
        name: 'message/index',
        component: () => import('@/components/message/message')
      },{
        path: '/message/detail',
        name: 'message/detail',
        component: () => import('@/components/message/detail')
      },{
        path: '/message/editor',
        name: 'message/editor',
        component: () => import('@/components/base/editor')
      }]
    },{
      path: '/note',
      name: 'note',
      component: Layout,
      children: [{
        path: '/note/index',
        name: 'note/index',
        component: () => import('@/components/note/note')
      }]
    },
    {
      path: '/diary',
      name: 'diary',
      component: Layout,
      children: [{
        path: '/diary/index',
        name: 'diary/index',
        component: () => import('@/components/diary/diary')
      }]
    },
    {
      path: '*',
      name: 'error',
    }
  ]
})
