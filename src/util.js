export const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}
export const getOffsetDay = (today, num) => new Date(today.valueOf() + num * 86400000)

const zeroPadding = (num) => Number(num) < 10 ? '0' + num : num

export const getFormatDate = (day, format) => {
    let tmp = {}
    tmp.YYYY = day.getFullYear().toString()
    tmp.MM = zeroPadding((day.getMonth() + 1))
    tmp.DD = zeroPadding(day.getDate())
    return format.replace(/([YMD]+)/g, function(match) {
        return tmp[match]
    })
}
export const getValidDate = (date) => date.replace(/\D/g,function(match){
    return '/'
})