const http = require('http')
const fs = require('fs')
const logger = require('./logger')

logger.info('starting server')

const server = http.createServer((req, res) => {
    const {socket} = req
    logger.info(`request received ${socket.remoteAddress} : ${req.url}`)
    const rs = fs.createReadStream(`.${req.url === '/' ? '/index.html' : req.url}`)
        
    rs.on('data', content => {
        logger.info('All sended OK')
        res.writeHead(200);
        res.end(`${content}`)
    })
    rs.on('error', error => {
        logger.warn(error)
        res.writeHead(404);
        res.end(`404 puta`)
    })
})
server.listen(8080, () => logger.info(`server up and running on port 8080`))