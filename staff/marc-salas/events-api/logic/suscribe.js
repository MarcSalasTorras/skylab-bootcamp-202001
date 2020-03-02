const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findOne({ _id: userId, suscribedEvents: eventId })
        .then(user => {

            if (user) throw new Error('user already suscribed')

            user.suscribedEvents.push(eventId)

            return user.save()
        })
        .then(() => {Event.findOne({ _id: eventId })})
        .then((event) =>{
            event.suscribed.push(userId)

            return event.save()
        })
        .then(() => { })
}