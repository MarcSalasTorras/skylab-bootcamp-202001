const fs = require('fs')

function log(level, message) {
    fs.writeFile('./server.log',`${level} ${message}`, (error)=>{
        if(error) console.log(error)
        console.log('file written')
    })
}
module.exports = {
    debug(message) { log('DEBUG', message) },
    info(message) { log('INFO', message) },
    warn(message) { log('WARN', message) },
    error(message) { log('ERROR', message) },
    fatal(message) { log('FATAL', message) }
}