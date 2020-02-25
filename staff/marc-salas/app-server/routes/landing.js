const { retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = ({ session: { token, acceptCookies } }, res) => {  
    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                const { name, username } = user

                //res.send(App({ title: 'My App', body: Landing({ name, username }), acceptCookies }))
                return res.render('landing', {name, username, acceptCookies})
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else {
        return res.render('landing', {acceptCookies})
        //res.send(App({ title: 'My App', body: Landing(), acceptCookies }))}
    }
}
