const { retrieveFavorites } = require('../logic')
const { App, Search } = require('../components')
const { logger } = require('../utils')

module.exports = ({ params: { username }, session: { token, acceptCookies }}, res) =>{
    try{
        retrieveFavorites(token, (error, favs) =>{
            if (error) return console.log(error)
            res.send(App({ title: 'Search', body: Search({ username, vehicles: favs }), acceptCookies }))

        })
    }catch({message}){


    }

} 