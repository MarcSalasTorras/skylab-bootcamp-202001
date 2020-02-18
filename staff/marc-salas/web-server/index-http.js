const http = require('http')
const fs = require('fs')
const logger = require('./logger')

const server = http.createServer((req, res) => {
    
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