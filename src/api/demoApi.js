import axios from './axios'
import qs from 'qs'
import {baseUrl} from '@/config/config'
import '../mock/userMock'
import menu from '../mock/menuMock'
export const login = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/login',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            var data = res.data
            if (params.username == data.account[0].username && params.password == data.account[0].password) {
                resolve({data: {token: '123456789'}, message: '登录成功', success: true})
            } else if (params.username == data.account[1].username && params.password == data.account[1].password) {
                resolve({data: {token: '987654321'}, message: '登录成功', success: true})
            } else {
                resolve({data: {}, message: '登录失败', success: false})
            }
        })
    })
}
