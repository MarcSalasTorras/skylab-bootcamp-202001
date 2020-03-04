const { validate } = require('events-utils')
const { models: { Event } } = require('events-data')

module.exports = (userId, body, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
 
    return Event.findOne({ _id: eventId, publisher: userId } )
        .then(event => {
            if (!event) throw new Error('user has not created this event')
            const {title, description, location, date} = body

            title && (event.title = title)
            description && (event.description = description)
            location && (event.location = location)
            date && (event.date = date)
            
            return event.save()
        })
}