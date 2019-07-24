import request from "./config"

export function getPersonInfo() {
    return request({
        url: "/user",
        method: "GET"
    })
}