const { validate } = require('events-utils')
const { models: { Event, User } } = require('events-data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return User.findById(publisher)
    .then(user => {
        if (!user) throw new NotFoundError(`user with id ${publisher} not found`)
        const event = new Event({ publisher, title, description, location, date, created: new Date })
        user.createdEvents.push(event.id)
        return Promise.all([user.save(), event.save()])
    })
    .then(() => { })

}
