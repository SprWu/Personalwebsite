import request from "./config"

export function getMessage(data) {
    return request({
        url: '/message',
        method: "GET",
        params: data
    })
}

export function getMessageDetail(id) {
    return request({
        url: '/message',
        method: "GET",
        params: {sql: `SELECT id,title,message,time FROM message WHERE id=${id}`}
    })
}

export function submitMsg(data) {
    return request({
        url: '/message',
        method: "POST",
        data: data
    })
}

export function deleteMsg(id) {
    return request({
        url: '/message',
        method: "DELETE",
        data: {name: "message", id: id}
    })
}