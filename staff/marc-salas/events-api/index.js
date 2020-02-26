require('dotenv').config()

const {env: {PORT = 8080, NODE_ENV: env}, argv:[, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const {registerUser, authenticateUser} = require('./routes')
const {name, version} = require('./package')
const bodyParser = require('body-parser')
const morgan = require('fs')
const fs = require('fs')
const path = require('path')

const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({ filename: 'server.log' })
    ]
})

if (env !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

const jsonBodyParser = bodyParser.json()

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express()

app.use(morgan('combined', {stream: accessLogStream}))

app.post('/users', jsonBodyParser, authenticateUser)

app.post('./users/auth', jsonBodyParser, registerUser)

app.listen(port, ()=> logger.info(`server ${name} ${version} up and runing on port ${port}`))

process.on('SIGINT', () => {
    logger.info('server abruptly stopped')

    process.exit(0)
})