const { validate } = require('../utils')
const { database } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    
    const users = database.collection('users')

    return users.findOne({email, password})
        .then(user =>{
            if (!user) throw new  NotAllowedError(`wrong credentials`)

            
            const { _id } = user

            return users.updateOne({ _id }, { $set: { authenticated: new Date } })
                .then(() => _id.toString())
        })

}