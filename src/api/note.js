import request from './config'

export function getAllNote() {
    return request({
        url: '/getAllNote',
        method: "GET"
    })
}

export function newNote(data) {
    return request({
        url: '/newNote',
        method: "POST",
        data: data
    })
}