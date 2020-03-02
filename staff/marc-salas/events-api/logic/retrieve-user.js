const { validate } = require('../utils')
const {models: {User}} =require('../data')
const {NotAllowedError, NotFoundError} = require('../errors')
module.exports = (sub) => {
    validate.string(sub, 'sub')

    const _id = ObjectId(sub)

    return User.findOne(_id)
        .then(user =>{
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Data

            return user.save()            
            // return users.updateOne({_id}, {$set:  {retrieved: new Date}})
            //     .then(() =>{
            //         const {name, surname, email} = user

            //         return {name, surname, email}
                    
            //     })
        })
}