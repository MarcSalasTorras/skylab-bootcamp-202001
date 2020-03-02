const {models: {Event}} = require('../data')

module.exports = () =>{

    return Event.find().sort({created: -1}).toArray()
        .then( events => {
    
            return events
        })

}