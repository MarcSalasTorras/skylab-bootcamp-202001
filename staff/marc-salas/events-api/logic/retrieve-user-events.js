const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = (id) =>{
    validate.string(id, 'id')

    const _id = ObjectId(id)

    const events = database.collection('events')

    return events.find({publisher: _id}).toArray()
        .then( event => {
            //if (!event) throw new NotFoundError(`user with id ${id} does not have any events`)

            return event
        })

}