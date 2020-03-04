const { validate } = require('events-utils')
const { models: { Event } } = require('events-data')

module.exports = (id) => {
    validate.string(id, 'id')

    return Event.find({ publisher: id })
        .lean()
        .then(events => {
            events.forEach(event => {
                event.id = event.id.toString()
                delete event.id
                event.publisher = event.publisher.toString()
            })
            return events
        })

}