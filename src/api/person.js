import request from "./config"

export function getPersonInfo() {
    return request({
        url: "/user",
        method: "GET",
        params: {username: localStorage.getItem('name') || "null"}
    })
}

export function getRole() {
    return request({
        url: "/getRole",
        method: "GET",
        params: {username: localStorage.getItem('name') || "null"}
    })
}

export function updateInfo(data) {
    return request({
        url: "/updateInfo",
        method: "POST",
        data: data
    })
}