import {getDemoList} from '@/api/demoApi'
const demo = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
      GetDemoList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getDemoList(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default demo
