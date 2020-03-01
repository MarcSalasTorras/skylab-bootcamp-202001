const {validate} = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, body, eventId) => {
    validate.string(userId, 'userId')
    //validate.string(body, 'body')
    validate.string(eventId, 'eventId')

    const user = database.collection('user')
    const event = database.collection('event')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    return user.findOne({ _id: _userId, suscribedEvents: _eventId })
    .then(user => {
        if (!user) throw new Error('user has not created this event')
    })
    .then(() =>{
        return event.updateOne({_id: _eventId}, {body})
    })
}