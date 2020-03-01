const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    const user = database.collection('users')
    const event = database.collection('events')

    return user.findOne({ _id: _userId, suscribedEvents: _eventId })
        .then(user => {
            
            if (user) throw new Error('user already suscribed')
        })
        .then(() => {
            return user.updateOne({ _id: _userId }, { $push: { suscribedEvents: _eventId } })
        })
        .then(() => { event.updateOne({ _id: _eventId }, { $push: { suscribed: _userId } }) })
        .then(() => { })
}