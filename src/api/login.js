import request from "./config"

export function Login(data) {
    return request({
        url: "/login",
        method: "POST",
        data: data
    })
}

export function Register(data) {
    return request({
        url: '/register',
        method: "POST",
        data: data
    })
}

export function sendReg(data) {
    return request({
        url: '/sendReg',
        method: "POST",
        data: data
    })
}