const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const {NotAllowedError} = require('../errors')

module.exports = (sub) => {
    validate.string(sub, 'sub')

    const _id = ObjectId(sub)

    const users = database.collection('users')

    return users.findOne(_id)
        .then(user =>{
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            return users.updateOne({_id}, {$set:  {retrieved: new Date}})
                .then(() =>{
                    const {name, surname, email} = user

                    return {name, surname, email}
                    
                })


        })
}