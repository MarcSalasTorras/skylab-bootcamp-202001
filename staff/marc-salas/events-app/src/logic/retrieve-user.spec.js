const { random } = Math
const { mongoose, models: { User } } = require('events-data')
const { retrieveUser } = require('.')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('retrieveUser', () => {
    let name, surname, email, password, token

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        return await User.deleteMany()
    })
    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await User.create(new User({ name, surname, email, password }))
        const response = await fetch('http://localhost:8085/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const _response = await response.json()
        token = _response.token
    })
    it('should recive the user data', async () => {
            const userData = await retrieveUser(token)
             console.dir(userData)
            // expect(userData).toBeDefined()
            // expect(typeof userData).toBe('object') 
        
    })
    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})