const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const retriveUser = require('./logic/retrive-user')

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)

app.post('/authenticate', (req, res) => {
  let body = ''

  req.on('data', chunk =>{
    body += chunk

  })
  
  req.on('end', ()=>{
    let username = body.split('&')[0].split('=')[1]
    let password = body.split('&')[1].split('=')[1]
  
    try{
      authenticate(username, password)
      const userData = retriveUser(username)
      res.send(`<h1>${userData.name}</h1>`)
    } catch(error){
      
      if(error) console.log(error)
    }
  })

})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
  logger.warn(`server abruptly stopped`)
  process.exit(0)
})