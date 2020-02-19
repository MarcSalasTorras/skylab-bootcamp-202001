const express = require('express')
const path = require('path')
const logger = require('./logger')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(express.static(path.join(__dirname,'public')))

app.use((res, req, next) => {
    
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})