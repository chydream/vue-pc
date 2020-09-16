import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/themes/cvue/layout/index'

Vue.use(Router)
// 路由实例
const router = new Router({
  scrollBehavior (to, from, savedPosition) { // 路由滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {}
      if (to.hash) {
        position.selector = to.hash
      }
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(position)
        }, 500)
      })
    }
  },
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'index',
          name: '首页',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/home/index')
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "public" */'../themes/login/login')
    },
    {
      path: '/login/admin',
      name: 'login2',
      component: () => import(/* webpackChunkName: "public" */'../themes/login/login2')
    },
    {
      path: '*',
      redirect: '/error/404'
    },
    {
      path: '/error/403',
      name: 'Error403',
      component: () => import(/* webpackChunkName: "public" */'../themes/error/403')
    },
    {
      path: '/error/404',
      name: 'Error404',
      component: () => import(/* webpackChunkName: "public" */'../themes/error/404')
    }
  ]
})
export default router
