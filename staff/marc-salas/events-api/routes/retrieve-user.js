const {retrieveUser} = require('../logic')

module.exports = (req ,res) => {
    const {sub} = req

    try{
        retrieveUser(sub)
        .then(user => res.status(200).json(user))
    }catch ({message}){
        res
        .status(401)
        .json({
            error: message
        }) 
    }
}