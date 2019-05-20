import axios from './axios'
import qs from 'qs'
import { baseUrl } from '@/config/config'
import '../mock/warningMock'

export const getWarningInfo = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/api/alarms',
      method: 'get',
      data: params
    }).then(res => {
      var data = res.data
      resolve(data)
    })
  })
}

export const setWarningInfo = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/api/alarms',
      method: 'put',
      data: params
    }).then(res => {
      var data = res.data
      resolve(data)
    })
  })
}
