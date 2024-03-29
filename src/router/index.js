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
      path: '/auth',
      name: 'Auth',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'index',
          name: '权限',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/auth/auth')
        }
      ]
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'index',
          name: '例子1',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/demo/index')
        },
        {
          path: 'faculty',
          name: '例子2',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/demo/grade')
        },
        {
          path: 'subject',
          name: '例子3',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/demo/subject')
        },
        {
          path: 'school-manage',
          name: '例子4',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/demo/schoolManage')
        },
        {
          path: 'uploader',
          name: '图片上传',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/vueCropper/uploader')
        },
        {
          path: 'work',
          name: '工作流',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/jsPlumb/index')
        },
        {
          path: 'work-list',
          name: '工作流1',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/jsPlumb/flow/workFlowDesign.vue')
        },
        {
          path: 'draggable',
          name: '拖放',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/draggable/index.vue')
        },
        {
          path: 'work-flow',
          name: '工作流2',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/draggable/work.vue')
        }
      ]
    },
    {
      path: '/live',
      name: 'Live',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'index',
          name: '直播',
          component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/live/index')
        }
      ]
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'line',
          name: '图表1',
          component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/chart/line')
        },
        {
          path: 'index',
          name: '图表2',
          component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/chart/index')
        }
      ]
    },
    {
      path: '/map-new',
      name: 'manNew',
      component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/layout/index'),
      children: [
        {
          path: 'index',
          name: '地图',
          component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/mapNew/index')
        }
      ]
    },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/layout/index'),
    //   children: [
    //     {
    //       path: 'index',
    //       name: '地图',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index')
    //     },
    //     {
    //       path: 'index1',
    //       name: '地图1',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index1')
    //     },
    //     {
    //       path: 'index2',
    //       name: '地图2',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index2')
    //     },
    //     {
    //       path: 'index3',
    //       name: '地图3',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index3')
    //     },
    //     {
    //       path: 'index4',
    //       name: '地图4',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index4')
    //     },
    //     {
    //       path: 'index5',
    //       name: '地图5',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/map/index5')
    //     }
    //   ]
    // },
    // {
    //   path: '/map-test',
    //   name: 'map-test',
    //   component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/layout/index'),
    //   children: [
    //     {
    //       path: 'index',
    //       name: '地图test',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/mapTest/index')
    //     },
    //     {
    //       path: 'route-plan',
    //       name: '线路规划',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/mapTest/routePlan')
    //     },
    //     {
    //       path: 'table',
    //       name: 'tableData',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/mapTest/table')
    //     },
    //     {
    //       path: 'circulationTime',
    //       name: 'circulationTime',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/analysisEcharts/mapEchart')
    //     },
    //     {
    //       path: 'marker',
    //       name: 'marker',
    //       component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/mapTest/marker')
    //     }
    //   ]
    // },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/demo/scroll-demo',
      name: '滚动',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/demo/exam.vue')
    },
    {
      path: '/big-data',
      name: 'bigData',
      component: () => import(/* webpackChunkName: "Home" */'../themes/cvue/views/bigData/index.vue')
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/workflow/index')
    },
    {
      path: '/workflownode',
      name: 'workflownode',
      component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/workflow/node')
    },
    {
      path: '/workflownode1',
      name: 'workflownode1',
      component: () => import(/* webpackChunkName: "chart" */'../themes/cvue/views/workflow/node1')
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
