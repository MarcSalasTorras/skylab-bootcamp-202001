const { validate } = require('../utils')
const { database, database: { ObjectId }, models: {Event} } = require('../data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const event = database.collection('events')
    const user = database.collection('users')

    return event.insertOne(new Event({ publisher: ObjectId(publisher), title, description, location, date }))
    .then(({insertedId})=>{
        return user.updateOne({_id: ObjectId(publisher)}, {$push:{createdEvents: insertedId }})
    }) 
    .then(()=>{})
}
