import axios from 'axios'

export default (email, password) => {
    if (typeof email !== 'string') throw new TypeError(`email ${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    return axios.post('http://localhost:8085/users/auth', { email, password })
        .then((response) => {
            const token = response.data.token
            return token
        })
}