const { random } = Math
const { mongoose, models: { User } } = require('events-data')
const { registerUser } = require('.')

//const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('registerUser', () => {
    let name, surname, email, password

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        return await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', async () => {
        const result = await registerUser(name, surname, email, password)

        expect(result).toBeUndefined()

        const user = await User.findOne({ email })

        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBe(password) // TODO encrypt this field!
        expect(user.created).toBeInstanceOf(Date)
    })

    // TODO unhappy paths and other happies if exist
    it('should fail wit allready register mail', async () => {
        try {
            await registerUser(name, surname, email, password)

            await registerUser(name, surname, email, password)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`user with email ${email} already exists`)

        }
    })
    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})