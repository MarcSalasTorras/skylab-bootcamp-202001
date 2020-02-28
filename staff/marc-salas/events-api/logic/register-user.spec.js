const { expect } = require('chai')
// const validate = require('../utils/validate')
const { users } = require('../data')
const { authenticateUser, registerUser } = require('../logic')
describe('register', () => {
    let name, surname, email, password
    beforeEach(() => {
        name = 'rpc-' + Math.random()
        surname = 'rpc-' + Math.random()
        email = 'rpc@' + Math.random() + '.com'
        password = 'rpc-' + Math.random()
    })
    it('should succeed on new user', () => {
        registerUser(name, surname, email, password)
            .then(response => {
                expect(response).to.equal(undefined)
            })
    })
    it('it should create the user wel', () => {
        registerUser(name, surname, email, password)
            .then(()=>{
                const user = users.find(user => user.email === email)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    })
    // describe('user already exist', () => {
    //     debugger
    //     registerUser(name, surname, email, password)
        
    //     it('should fail if user already exist', () => {
    //             registerUser(name, surname, email, password)
    //             .then(()=>{'should not show this'})
    //             .catch((error) =>{
    //                 expect(error).to.be.an('error')
    //             })
            
    //     })

    // })
})