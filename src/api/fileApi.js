import axios from './axios'
import qs from 'qs'
import { fileUrl } from '@/config/config'
import { fileData } from '@/config/fileDataUrl'
// 文件
// 大文件上传
export const bigFilePost = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: fileUrl + fileData.bigFilePost,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: params,
      timeout: 600000
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
// 文件合并
export const mergeFilePost = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: fileUrl + fileData.mergeFilePost,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(params),
      timeout: 600000
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
// 文件查询
export const filesGet = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: fileUrl + fileData.fileGet,
      method: 'GET',
      params
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}

// 小文件上传
export const filesPost = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: fileUrl + fileData.filesPost,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: params,
      timeout: 30000
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
