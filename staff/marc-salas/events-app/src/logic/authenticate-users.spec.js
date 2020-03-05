const { random } = Math
const { mongoose, models: { User } } = require('events-data')
const { authenticateUser } = require('.')
const { ContentError } = require('events-errors')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('authenticateUser', () => {
    let name, surname, email, password

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
    })
    it('should return the token on a correct credentials', async () => {
        const token = await authenticateUser(email, password)

        expect(token).toBeDefined()
        expect(typeof token).toBe('string')

    })
    it('should fail on incorrect email not registered', async () => {
        try {
            await authenticateUser(`fail-${email}`, password)
        } catch (error) {
            expect(error instanceof Error).toBe(true)
            expect(error.message).toBe(`wrong credentials`)
        }
    })
    it('should fail on incorrect password', async () => {
        try {
            await authenticateUser(email, `${password}-fail`)
        } catch (error) {
            expect(error instanceof Error).toBe(true)
            expect(error.message).toBe(`wrong credentials`)
        }
    })
    it('should fail on non email input', async () => {
        try {
            await authenticateUser(`${email}-fail`, password)
        } catch (error) {
            expect(error instanceof ContentError).toBe(true)
            expect(error.message).toBe(`${email}-fail is not an e-mail`)
        }
    })
    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})