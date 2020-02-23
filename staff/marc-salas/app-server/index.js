const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Home, Register, Landing, Search, Details } = require('./components')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                session.token = token

                const { username } = user

                res.redirect(`/search/${username}`)
            })
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/search/:username', (req, res) => {
    const { params: { username }, session: { token, acceptCookies }, query } = req
    const _query = query.query
    req.session.username = username
    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req
            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user

        if (username === _username) {
            const { name } = user
            if (_query) {
                searchVehicles(token, _query, (error, vehicles) => {
                    debugger
                    if (error) {
                        return res.send(App({ title: 'Search', body: Search({ name, error: message, fav: user.fav }), session: { acceptCookies, token } }))
                    }
                    req.session.query = _query
                    res.send(App({ title: 'Search', body: Search({ name, vehicles }), acceptCookies }))
                })

            } else return res.send(App({ title: 'Search', body: Search({ name }), acceptCookies }))

        } else res.redirect('/login')
    })
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password, (error, ) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }
            return res.redirect('/login')
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.get('/details/:id', ({ params: { id }, session: { token, acceptCookies, query, username } }, res) => {
    try {
        retrieveVehicle(token, id, (error, vehicle) => {
        
            if (error) return console.log(error)
            res.send(App({ title: 'Details', body: Details(vehicle, username, query), acceptCookies }))

        })
    } catch ({ message }) {
        console.log(message)
    }

})
app.post('/toggle-fav/:id', ({ params: { id }, session: { token, acceptCookies, query, username } }, res) => {
    try {
    
        toggleFavVehicle(token, id, (error) => {
            if(error) return console.log(error)
            return res.redirect(`/search/${username}?query=${query}`)
        })
    } catch ({ message }) {
        console.log(message)
    }
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})