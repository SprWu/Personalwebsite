import request from "./config"

export function getMessage() {
    return request({
        url: '/message',
        method: "GET"
    })
}

export function getMessageDetail(data) {
    return request({
        url: '/messageDetail',
        method: "GET",
        params: data
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