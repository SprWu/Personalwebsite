import request from "./config"

export function getAllNovel() {
    return request({
        url: '/getAllNovel',
        method: 'GET'
    })
}

export function getNovelCatalog(novelName) {
    return request({
        url: '/getNovelCatalog',
        method: 'GET',
        params: {name: novelName}
    })
}

export function getNovel(data) {
    return request({
        url: '/getNovel',
        method: "GET",
        params: data
    })
}

export function uploadInfo(data) {
    return request({
        url: '/uploadInfo',
        method: 'POST',
        data: data
    })
}