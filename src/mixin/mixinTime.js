export var formatTime = {
    filters: {
        format(time) {
            let date = time.substr(0,10)
            let t = time.substr(11,8)
            return `${date} ${t}`
        }
    }
}