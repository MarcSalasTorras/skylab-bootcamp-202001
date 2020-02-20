const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const retriveUser = require('./logic/retrive-user')
const parseMidWare = require('./utils/parser-mid-ware')
const register = require('./logic/register')

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)

app.use('/register', parseMidWare)

app.use('/register', (req, res, next) => {
  
  req.on('end', () =>{
    try{
      const {name, surname, username, password} = req.body
      console.dir(req.body)
      register(name, surname, username, password)
      res.redirect(`/index.html`)
    } catch(error) {
        console.log(error)
        res.send(`<h1>WRONG CREDENTIALS</h1> <a href="./register.html">back to ligin</a>`) 
    }


  })
  
})

app.use('/authenticate', parseMidWare)

app.use('/authenticate', (req, res, next) => {
  
  req.on('end', () =>{
    try {
      console.dir(req.body)
      authenticate(req.body.username, req.body.password)
      const userData = retriveUser(req.body.username)
      res.send(`<h1>${userData.name}</h1><a href="/index.html"> logout </a>`)
    } catch (error) {
  
      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web-Server</title>
</head>
<body>
    <form action="/authenticate" method="post">
        <label for="username">username</label>
        <input type="text" name="username">
        <label for="password">password</label>
        <input type="password" name="password">
        <button type="submit">login</button>
        <a href="/register.html">to register</a>
        <p>wrong credentials</p>
    </form>
</body>
</html>`)
    }

  })


})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
  logger.warn(`server abruptly stopped`)
  process.exit(0)
})