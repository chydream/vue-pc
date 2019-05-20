import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import common from './modules/common'
import warning from './modules/warning'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    warning
  },
  getters
})
export default store
