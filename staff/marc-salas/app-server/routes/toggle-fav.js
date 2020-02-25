const { toggleFavVehicle, searchVehicles } = require('../logic')
const { logger } = require('../utils')
const { App, Search} = require('../components')

module.exports = (req , res) => {
    const { params: { id }, session } = req
    
    const { token, username, user, acceptCookies } = session
    
    if (!token){
        session.referer = req.get('referer')

        session.fav = id

        return session.save(() => res.redirect('/login'))
    }
    try {
        toggleFavVehicle(token, id, (error) => {
            if(error) return console.log(error)

            // const { referer = req.get('referer') } = session

            // delete session.referer
            // delete session.fav

            searchVehicles(token, session.query, (error, vehicles) => {
                if (error) {
                    return res.send(App({ title: 'Search', body: Search({ username, error: message, fav: user.fav }), session: { acceptCookies, token } }))
                }
                req.session.query = session.query
                res.send(App({ title: 'Search', body: Search({ username, vehicles }), acceptCookies }))
            })
        })
    } catch ({ message }) {
        console.log(message)
    }
}