const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
//const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, toggleFavVehicle, retrieveFavorites } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
//const { Login, App, Home, Register, Landing, Search, Details } = require('./components')
const { landing, login, loginPost, logout, register, registerPost, acceptCookies, search, toggleFav, details, favorites } = require('./routes')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 24 * 60 * 60 * 1000 }, resave: false, saveUninitialized: true }))

app.get('/', landing)

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.get('/search/:username', search)

app.post('/logout', urlencodedBodyParser, logout)

app.post('/register',urlencodedBodyParser, registerPost)

app.get('/register', register)

app.get('/details/:id', details)

app.post('/toggle-fav/:id', toggleFav)

app.get('/favorites/:username', favorites)

app.post('/accept-cookies', acceptCookies)

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})