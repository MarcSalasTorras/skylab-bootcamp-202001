const {validate} = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, eventId) =>{
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

   const _userId = ObjectId(userId)
   const _eventId = ObjectId(eventId)
   
   const user = database.collection('events')
   const event = database.collection('event')

   return user.updateOne({_userId}, { $push: {suscribedEvents : _eventId}})
   .then( () => {event.updateOne({_eventId}, { $push: {suscribed : _userId}})})
   .then (() => {})
}