//  The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 权限控制
import './router/rolePermission'
// 引入element框架
import ElementUI from 'element-ui'
// element主题配置
import './style/element-variables.scss'
// element语言配置
import locale from 'element-ui/lib/locale/lang/zh-CN'
// 多语言
import i18n from './i18n'
// 状态管理
import store from './store'
// 全局指令
import './directives/install'
// 全局mixins
import './mixins/install'
// 全局过滤器
import './filters/install'
// 引入font-awesome字体图标
import 'font-awesome/css/font-awesome.min.css'
// import promise from 'es6-promise'
// promise.polyfill()
// import 'babel-polyfill'
import AmapVue from '@amap/amap-vue'
AmapVue.config.version = '2.0' // 默认2.0，这里可以不修改
AmapVue.config.key = '7e53fd9d108777f924f22a9a7bf85294'
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation'
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
]
Vue.use(AmapVue)

Vue.use(ElementUI, {size: 'small', zIndex: 3000, locale})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
