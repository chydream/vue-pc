import { getWarningInfo, setWarningInfo } from '../../api/warringApi'
const warning = {
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    GetWarningInfo ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        getWarningInfo(params).then(res => {
          resolve(res)
        })
      })
    },
    SetWarningInfo ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        setWarningInfo().then(res => {
          resolve(res)
        })
      })
    }
  }
}

export default warning
