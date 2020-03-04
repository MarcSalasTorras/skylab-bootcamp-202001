const { retrieveLastUserEvents } = require('../logic')
const { NotFoundError, ContentError } = require('events-errors')

module.exports = (req, res) => {

    try {
        console.log('im here')
        retrieveLastUserEvents()
        .then(events =>{
            res.status(200).json(events)
        })
        .catch(error =>{
            let status = 400
            const {message} = error

            res 
            .status(status)
            .json(message)
        })
    } catch (error) {
        let status = 400
        
        if (error instanceof ContentError)
            status = 406
        
        const {message} = error
        
        res
            .status(status)
            .json(message)
        
    }
}