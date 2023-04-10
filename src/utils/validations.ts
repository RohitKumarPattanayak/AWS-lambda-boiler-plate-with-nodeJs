export const paramValidator = (item, type = 'string') => {
    if (typeof item === 'string') {
        if (item.length !== 0) return item.replace(/[&\/\\#^+()$~%.'":*?<>{}!@,-]/g, '').trim()
    }
    if (Array.isArray(item)) {
        item = item.map((ele) => {
            if (type === 'number') return Number(ele.replace(/[&\/\\#^+()$~%.'":*?<>{}!@,-]/g, '').trim())
            if (type === 'string') return ele.replace(/[&\/\\#^+()$~%.'":*?<>{}!@,-]/g, '').trim()
        })
        return item
    }
    return false
}

export const hourMinuteParser = (secondsArray) => {
    let formattedArray
    if (typeof secondsArray === 'number') {
        formattedArray =
            (Math.floor(secondsArray / 3600) < 10 ? '0' + Math.floor(secondsArray / 3600) : Math.floor(secondsArray / 3600)) +
            ':' +
            ('0' + (Math.floor(secondsArray / 60) % 60)).slice(-2)
    } else {
        formattedArray = secondsArray.map((ele) => {
            return {
                ...ele,
                total_hours_worked:
                    (Math.floor(ele.total_hours_worked / 3600) < 10
                        ? '0' + Math.floor(ele.total_hours_worked / 3600)
                        : Math.floor(ele.total_hours_worked / 3600)) +
                    ':' +
                    ('0' + (Math.floor(ele.total_hours_worked / 60) % 60)).slice(-2)
            }
        })
    }
    return formattedArray
}

export const expressValidationResponse = () => {
    return 'Invalid request params or body.'
}

