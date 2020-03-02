module.exports = {
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    authenticated: {type: Date},
    suscrivedEvents: {type: Array}

}