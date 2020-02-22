const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const retriveUser = require('./logic/retrive-user')
const bodyParser = require('body-parser')
const register = require('./logic/register')
const Home = require('./components/home')
const App = require('./components/app')
const Login = require('./components/login')
const Register = require('./components/register')
const Landing = require('./components/landing')
const cookieParserMidWare = require('./utils/cookie-parser-mid-ware')
const sessions = require('./data/sessions')
const CookieMessage = require('./components/cookie-message')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

logger.level = logger.DEBUG

logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)
app.use(cookieParserMidWare)
app.use(urlencodedBodyParser)


app.get('/', (req, res)=>{
  const {cookies:{username}} = req

  if(sessions.includes(username)) return res.redirect(`/home/${username}`)
  
  res.send(App({title: 'Landing', body: Landing()}))
})

app.get('/register', (req, res) =>{
  const {cookies:{username}} = req

  if(sessions.includes(username)) return res.redirect(`/home/${username}`)

  res.send(App({title: 'Register', body: Register()}))
})

app.get('/login', (req, res) => {
  const {cookies:{username}} = req

  if (sessions.includes(username)) return res.redirect(`/home/${username}`)
  
  res.send(App({title: 'Login', body: Login()}))
})
app.get('/home/:username', (req, res) => {
  const {params : {username}} = req
  const {name} = retriveUser(username)
  
  res.send(App({title: 'Home', body: Home({name})}))
})

app.post('/register', (req, res) => {

    try {
      const { name, surname, username, password } = req.body
      register(name, surname, username, password)
      res.redirect('/login')
    } catch ({message}) {
      res.send(App({title: 'Register', body: Register({error: message})}))
    }
})


app.post('/login', (req, res) => {
  
  const {username, password} = req.body
    
  try {
      
      authenticate(username, password)
      
      sessions.push(username)

      const {cookies:{username: _username}} = req
      
      username !== _username && res.setHeader('set-cookie', `username=${username}`)
      
      res.redirect(`/home/${username}`)
    
    } catch ({message}) {
      
      res.send(App({title: 'Login', body: Login({error: message})}))
    
    }
})

app.post('/logout',(req, res) =>{
  const {username} = req.body
  
  const index = sessions.indexOf(username)

  sessions.splice(index,1)
  
  res.clearCookie(`username`)
  res.redirect('/login')
})

app.post('/cookieMesage', (req,res) =>{
  const {discart, accept} = req.body
  const answer = accept
  if(discart) res.redirect('/login')
  else if (accept) res.send(App({title: 'Login', body: Login({accept})}))
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
  logger.warn(`server abruptly stopped`)
  process.exit(0)
})
