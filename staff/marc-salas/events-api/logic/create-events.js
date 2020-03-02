const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return Event.insertOne(new Event({ publisher: ObjectId(publisher), title, description, location, date }))
    .then(({insertedId})=>{
        return User.updateOne({_id: ObjectId(publisher)}, {$push:{createdEvents: insertedId }})
    }) 
    .then(()=>{})
}
