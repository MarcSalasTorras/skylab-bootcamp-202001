const { retrieveVehicle } = require('../logic')
const { App, Details } = require('../components')
const { logger } = require('../utils')

module.exports = ({ params: { id }, session: { token, acceptCookies, query, username } }, res) => {
    try {
        retrieveVehicle(token, id, (error, vehicle) => {
        
            if (error) return console.log(error)
            res.send(App({ title: 'Details', body: Details(vehicle, username, query), acceptCookies }))

        })
    } catch ({ message }) {
        console.log(message)
    }

}