const { toggleFavVehicle } = require('../logic')
const { logger } = require('../utils')

module.exports = (req , res) => {
    const { params: { id }, session: { token, acceptCookies, query, username } } = req
    const _query = req.query.query
    try {
        toggleFavVehicle(token, id, (error) => {
            if(error) return console.log(error)
            res.redirect(`/search/${username}?query=${query}`)
            //else return res.redirect(`/favorites/${username}?`)
        })
    } catch ({ message }) {
        console.log(message)
    }
}