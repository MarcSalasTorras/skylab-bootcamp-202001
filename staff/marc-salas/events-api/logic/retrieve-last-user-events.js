const {models: {Event}} = require('events-data')

module.exports = () => Event.find()
    .lean()
    .then(events => {
        // sanitize
        events.forEach(event => {
            event.id = event._id.toString()
            delete event._id
            event.publisher = event.publisher.toString()
        })
        return events
    })