const { authenticateUser, retrieveUser } = require('../logic')
const { App, Login } = require('../components')
//const { logger } = require('../utils')

module.exports= (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                //return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                return res.render('login', { error: message, username, acceptCookies })
            }

            retrieveUser(token, (error, user) => {
                if (error) {    
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    //return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                    return res.render('login', { error: message, username, acceptCookies })
                }

                session.token = token

                session.save(() => {
                    const { fav } = session
                    if (fav) return res.redirect(307, `/toggle-fav/${fav}`)
    
                    res.redirect('/')
                })
            })
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        //res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        return res.render('login', { error: message, username, acceptCookies })
    }
}