import request from "./config"

export function Login(data) {
    return request({
        url: "/login",
        method: "POST",
        data: data
    })
}