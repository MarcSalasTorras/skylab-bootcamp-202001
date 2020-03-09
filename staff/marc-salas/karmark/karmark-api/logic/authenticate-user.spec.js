require('dotenv').config()

const { expect } = require('chai')
const {random } = Math
const {mongoose, models: {User}} = require('karmark-data')
const {ContentError, NotAllowedError} = require('karmark-errors')
const {authenticateUser} = require('./')
const bcrypt = require('bcryptjs')

const {env: {TEST_MONGODB_URL}} = process

describe('authenticateUser', () => {
    let username, password

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    beforeEach(() =>{
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`

        return bcrypt.hash(password, 10)
            .then ((password) => User.create({name, surname, username, password}))
            .then(({id}) => id)

    })
})