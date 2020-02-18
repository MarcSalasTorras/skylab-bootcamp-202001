const net = require('net')
const fs = require('fs')
const logger = require('./logger')

logger.info('starting server')

const server = net.createServer(socket => {
    console.log('server started')
    socket.on('data', chunk => {
        let data = chunk.toString('utf-8')
        const headers = data.split('\n')
        
        let path = headers[0].split('/')[1].split(' ')[0]

        console.log(headers)

        if(path !== 'favico.ico'){

            const rs = fs.createReadStream(`./${path}`)
            
            rs.on('data', content => { 
                socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: \nContent-Type: text/html\n\n${content.toString()}\n`) 
            })
            rs.on('error', error => { console.error(error); })
        }
        
    })

})


server.listen(8080)