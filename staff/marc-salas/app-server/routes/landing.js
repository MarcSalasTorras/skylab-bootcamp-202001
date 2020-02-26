const { retrieveUser } = require('../logic')
const { logger } = require('../utils')

module.exports = ({ session: { token, acceptCookies } }, res) => {
    debugger
    if (token) {
        try {
            retrieveUser(token)
            .then(user => {
                // if (error) {
                //     logger.error(error)
    
                //     res.redirect('/error')
                // }
    
                const { name, username } = user
    
                res.render('landing', { name, username, acceptCookies })
                
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else res.render('landing', { acceptCookies })
}