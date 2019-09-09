import request from "./config"

export function regMiddle(data) {
    return request({
        url: '/middle',
        method: "POST",
        data: data
    })
}

export function getUserList() {
    return request({
        url: '/getUserList',
        method: "GET"
    })
}

export function updateRole(data) {
    return request({
        url: '/updateRole',
        method: "POST",
        data: data
    })
}