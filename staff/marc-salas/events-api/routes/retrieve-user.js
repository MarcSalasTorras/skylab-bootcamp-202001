const { retrieveUser } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {
    const { sub } = req

    try {
        retrieveUser(sub)
            .then(user => res.status(200).json(user))
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404
                break
            case error instanceof NotAllowedError:
                status = 403
        }

        const { message } = error
        res
            .status(401)
            .json({
                error: message
            })
    }
}