const Search = require('./search')
const User = require('./home')
const Results = require('./results')


module.exports = function(props = {}) {
    const { name, username, query, vehicles } = props
    return `${username? Home({name, username}) : `<a href="/register">Register</a> or <a href="/login">Login</a>`}

    ${Search({ query })}
    ${vehicles? Results({ vehicles }) : ''}`
}