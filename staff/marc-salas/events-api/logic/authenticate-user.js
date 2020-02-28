const {validate} = require('../utils')
const {database} = require('../data')

const { env: { SECRET } } = process

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    
    const users = database.collection('users')

    return users.findOne(email, password)
        .then(user =>{
            if (!user) throw new  NotAllowedError(`wrong credentials`)

            

        })




    // const user = users.find(user => user.email === email && user.password === password)

    // if (!user) throw new Error('wrong credentials')

    // const token = jwt.sign( {sub: user.id}, SECRET, {expiresIn: '1h'} )

    // user.authenticated = new Date

    // return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    //     .then(()=> token)
}