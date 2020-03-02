const { validate } = require('../utils')
const { models: { Event } } = require('../data')

module.exports = (userId, body, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Event.findOne({ _id: eventId, publisher: userId })
        .then(event => {
            if (!event) throw new Error('user has not created this event')

            event.body = body

            return event.save()
        })
}