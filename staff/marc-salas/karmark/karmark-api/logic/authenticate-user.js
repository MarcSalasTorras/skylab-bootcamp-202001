const {validate} = require('karmark-utils')
const {models: {User}} = require('karmark-utils')
const {NotAllowedError} = require('karmark-errors')
const bcrypt = require('bcryptjs')

module.exports = (username, password) => {
    validate.string(username, 'username')
    validate.string(password, 'password')

    return User.findOne({username})
        .then(user =>{
            if (!user) throw new NotAllowedError (`wrong credentials`)

            return bcrypt.compare(password, user.password)
                .then(validatePassword => {
                    if (!validatePassword) throw new NotAllowedError('wrong credentials')

                    user.athenticate = new Date

                    return user.save()
                })
                .then(({id}) => id)               
        })
}