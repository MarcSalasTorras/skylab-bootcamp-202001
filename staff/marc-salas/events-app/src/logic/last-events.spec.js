const { mongoose, models: { Event } } = require('events-data')
const { lastEvents } = require('.')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('lastEvents', () => {
    let publisher, title, description, location, date

    beforeAll( async () =>{

        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await Event.deleteMany()

        publisher = '5e5e8e809781293e0429354f'
        title = 'party'
        description = 'have fun'
        location = 'Barcelona'
        date = new Date

        await Event.create(new Event({publisher, title, description, location, date }))
        await Event.create(new Event({publisher, title, description, location, date }))
        return await Event.create(new Event({publisher, title, description, location, date }))
    })
    it('should return all the events', async () => {
        const events = await lastEvents()
 
        expect(events).toBeDefined()
    })
    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})