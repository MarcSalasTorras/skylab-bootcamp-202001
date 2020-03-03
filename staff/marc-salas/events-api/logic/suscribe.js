const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Promise.all([User.findById(userId), Event.findById(eventId)])
    .then(([user, event]) => {
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        if (!event) throw new NotFoundError(`event with id ${id} not found`)
        user.suscribedEvents.push(event.id)
        event.suscribed.push(user.id)
        return Promise.all([user.save(), event.save()])
    })
    .then(() => { })



    // return User.findByIdAndUpdate(userId, {$addToSet: {suscribedEvents: _eventId }})
    //     .then(() => Event.findByIdAndUpdate(eventId, {$addToSet: {suscribed: _userId }}))
    //     .then(() =>{})
}