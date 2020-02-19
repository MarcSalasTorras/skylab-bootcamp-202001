const users = require('./data')

function authenticate(username, password) {
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');
    var user = users.find(function (user) { return username === user.username });
    if (!user || user.password !== password) throw new Error('Wrong credentials')
}
module.exports = authenticate