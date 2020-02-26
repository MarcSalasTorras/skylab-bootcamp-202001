const {authenticateUser} = require('../logic')

module.exports = (req, res) =>{
    const {body: {email, password}} = req

    try { 
        authenticateUser(email, password)
        .then(() => res.status(200).end())
        .catch(({message}) => {
            res
                .status(409)
                .json({
                    error: message
                })
        })
    }catch ({message}) {
        res
        .status(409)
        .json({
            error: message
        })
    }
}