const {validate} = require('../utils')
const {models: {Event}} = require('../data')

module.exports = (id) => {
    validate.string(id, 'id')

    return Event.find({suscribed: id}).toArray()
    .then(_events =>{
        return _events
    })

}