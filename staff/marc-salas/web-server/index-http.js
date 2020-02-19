const http = require('http')
const fs = require('fs')
const logger = require('./logger')

logger.info('starting server')

const server = http.createServer((req, res) => {
    logger.info(`request received ${req.socket.remoteAddress} : ${req.url}`)
    const rs = fs.createReadStream(`.${req.url === '/' ? '/index.html' : req.url}`)
        
    rs.on('data', content => {
        res.writeHead(200);
        res.end(`${content}`)
    })
    rs.on('error', error => {
        res.writeHead(404);
        res.end(`404 puta`)
    })
})
server.listen(8080)