const { searchVehicles, retrieveUser } = require('../logic')
const { App, Search, Landing } = require('../components')
//const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { username }, session, query } = req
    const { token, acceptCookies } = session
    const _query = query.query
    if (token){
        try{
            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req
                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }
                
                const { username: _username } = user
                
                if (username === _username) {
                    req.session.username = username
                    if (session.query) {
                        searchVehicles(token, session.query, (error, vehicles) => {
                            if (error) {
                                return res.send(App({ title: 'Search', body: Search({ username, error: message, fav: user.fav }), session: { acceptCookies, token } }))
                            }
                            req.session.query = session.query
                            res.send(App({ title: 'Search', body: Search({ username, vehicles }), acceptCookies }))
                        })
        
                    } else return res.send(App({ title: 'Search', body: Search({ username }), acceptCookies }))
        
                } else res.redirect('/login')
            })

        }catch({message}){
            console.dir(error)
        }
    }else{
        try {
            searchVehicles(token, _query, (error, vehicles) => {
                const { session: { acceptCookies } } = req

                if (error) {
                    //logger.error(error)

                    //res.redirect('/error')
                    console.log(error.message)
                }
                req.session.query = _query
                debugger
                res.send(App({ title: 'Search', body: Landing({ query, vehicles }), acceptCookies }))
            })
        } catch (error) {
            //logger.error(error)

            //res.redirect('/error')
            console.log(error.message)
        }

    }
    
}