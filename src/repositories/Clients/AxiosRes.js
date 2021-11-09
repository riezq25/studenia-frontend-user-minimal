export default function (res) {
    return {
        status: res.status,
        statusText: res.statusText,
        data: res.data,
    }
}
