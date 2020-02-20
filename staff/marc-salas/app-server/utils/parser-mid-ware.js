function parseMidWare(req, res, next) {
    let data = ""
    const body = {}

    req.on('data', chunk => {
        data += chunk

    })
    req.on('end', () => {
        const elements = data.split('&')
        
        elements.forEach( element => {
            const key = element.split('=')[0]
            const value = element.split('=')[1]

            body[key] = value
        })
        req.body = body
    })
    next()
}
module.exports = parseMidWare