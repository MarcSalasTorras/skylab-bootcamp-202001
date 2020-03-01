const {validate} = require('../utils')
const {database, database: {ObjectId}} = require ('../data')

module.exports = (id) => {
    validate.string(id, 'id')

    const _id = ObjectId(id)

    const events = database.collection('events')

    return events.find({suscribed: _id}).toArray()
    .then(_events =>{
        return _events
    })

}