import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/base/layout"

import {
  getToken
} from "@/api/token"

Vue.use(Router)

const router = new Router({
  routes: [{
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
      }, {
        path: '/message/detail',
        name: 'message/detail',
        component: () => import('@/components/message/detail')
      }, {
        path: '/message/editor',
        name: 'message/editor',
        component: () => import('@/components/message/msgEditor')
      }]
    }, {
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
      path: '/novel',
      name: 'novel',
      component: Layout,
      children: [{
        path: '/novel/index',
        name: 'novel/index',
        component: () => import('@/components/novel/novel')
      }, {
        path: '/novel/catalog',
        name: 'novel/catalog',
        component: () => import('@/components/novel/sub/catalog')
      }, {
        path: '/novel/text',
        name: 'novel/text',
        component: () => import('@/components/novel/sub/text')
      }]
    },
    {
      path: '/middle',
      name: 'middle',
      component: Layout,
      children: [{
        path: '/manage/middle',
        name: 'manage/middle',
        component: () => import('@/components/manage/middle')
      },{
        path: '/manage/manage',
        name: 'manage/manage',
        component: () => import('@/components/manage/manage')
      }]
    },
    {
      path: '/mobileIndex',
      name: 'mobileIndex',
      component: () => import('@/components/index/mobileIndex')
    },
    {
      path: '/m.novel',
      name: 'm.novel',
      component: () => import('@/components/novel/mNovel'),
    },
    {
      path: '/m.novel/text',
      name: 'mtext',
      component: () => import('@/components/novel/sub/mtext')
    },
    {
      path: '*',
      name: 'error',
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = getToken() == null ? false : true
  if (isMobile()) {
    switch (to.path) {
      case '/index':
      case '/':
        router.push({
          name: 'mobileIndex'
        })
        break;
      case '/mobileIndex':
        if (isLogin) {
          router.push({
            name: 'm.novel'
          })
        } else {
          next();
        }
        break;
      case '/m.novel':
      case '/m.novel/text':
        if (isLogin) {
          next();
        } else {
          router.push({
            name: 'mobileIndex'
          })
        }
        break;
      default:
        next()
        break;
    }
  } else {
    switch (to.path) {
      case '/novel/index':
      case '/novel/catalog':
      case '/novel/text':
        if (isLogin) {
          next();
        } else {
          router.push({
            name: 'index'
          })
        }
        break;
      case '/mobileIndex':
      case '/mobile/novel/*':
        router.push({
          name: 'index'
        })
        break;
      case '/manage/manage':
        if(from.name != 'manage/middle') {
          router.push({
            name: 'index'
          })
        } else {
          next()
        }
        break;
      default:
        next();
        break;
    }
  }

  // if(['/index','/'].includes(to.path)) {
  //   if(isMobile()) {
  //     router.push({
  //       name: 'mobileIndex'
  //     })
  //   } else {
  //     next()
  //   }
  // } else if(['/novel/index','/novel/catalog','/novel/text'].includes(to.path)) {
  //   if(isLogin) {
  //     next()
  //   } else {
  //     router.push({
  //       name: 'index'
  //     })
  //   }
  // } else {
  //   next()
  // }
})

function isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag == null ? false : true;
}

export default router
