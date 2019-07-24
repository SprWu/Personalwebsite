import axios from "axios"
import qs from 'qs'
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import { getToken } from "./token"
import { Message } from 'element-ui'

NProgress.configure({showSpinner: false })

const baseURL = "http://localhost"
const port = 9000

const request = axios.create({
    baseURL: `${baseURL}:${port}`,
    timeout: 5000,
    withCredentials: true
})


// 请求拦截器
request.interceptors.request.use( config => {
    config.headers = {
        'Content-Type': 'application/json',
    }
    config.data = JSON.stringify(config.data)
    if(getToken()) {
        config.headers['token'] = getToken();
    }
    NProgress.start()
    return config
}, err => {
    Message.error({
        message: "请求超时",
        type: 'error'
    })
})


// 响应拦截器
request.interceptors.response.use( response => {
    NProgress.done()
    if(response.data.code == 0 || response.data.code == 1) {
        Message.error({
            message: response.data.data
        })
    }
    return response;
}, err => {
    console.log(err)
    return Promise.reject(err)
})

export default request