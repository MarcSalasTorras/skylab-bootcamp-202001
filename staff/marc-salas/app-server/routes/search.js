const { searchVehicles, retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
//const { logger } = require('../utils')

module.exports = (req, res) => {
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
                        return res.send(App({ title: 'Search', body: Search({ username, error: message, fav: user.fav }), session: { acceptCookies, token } }))
                    }
                    req.session.query = _query
                    res.send(App({ title: 'Search', body: Search({ username, vehicles }), acceptCookies }))
                })

            } else return res.send(App({ title: 'Search', body: Search({ username }), acceptCookies }))

        } else res.redirect('/login')
    })
}