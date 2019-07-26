import request from "./config"

export function getMessage(data) {
    return request({
        url: '/message',
        type: "GET",
        params: data
    })
}

export function getMessageDetail(id) {
    return request({
        url: 'message',
        type: "GET",
        params: {sql: `SELECT id,title,message,time FROM message WHERE id=${id}`}
    })
}