const { validate } = require('events-utils')
const {models: {User}} =require('events-data')
const {NotAllowedError, NotFoundError} = require('events-errors')
module.exports = (sub) => {
    validate.string(sub, 'sub')

    //const _id = ObjectId(sub)

    return User.findById(sub)
        .then(user =>{
            if (!user) throw new NotFoundError(`user with id ${sub} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${sub} is deactivated`)

            user.retrieved = new Date

            user.id = user._id.toString()
            
            user.createdEvents.forEach(event =>{
                event = event.toString()
            })

            user.suscribedEvents.forEach(event =>{
                event = event.toString()
            })

            console.log(user)
            return user           
        })
}