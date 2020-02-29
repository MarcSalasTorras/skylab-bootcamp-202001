const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const event = database.collection('events')

    return event.insertOne(new Event({ publisher: ObjectId(publisher), title, description, location, date }))
    .then(()=>{})

}
