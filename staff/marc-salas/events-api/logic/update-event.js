const {validate} = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, body, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const events = database.collection('events')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    return events.findOne({ _id: _eventId, publisher: _userId })
    .then(event => {
        console.log(_eventId)
        console.log(_userId)
        console.dir(event)
        if (!event) throw new Error('user has not created this event')
    })
    .then(() =>{
        return events.updateOne({_id: _eventId}, {$set: body})
    })
}