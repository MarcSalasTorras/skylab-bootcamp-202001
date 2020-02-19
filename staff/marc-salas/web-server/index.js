const express = require('express')
const path = require('path')
const logger = require('./logger')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})