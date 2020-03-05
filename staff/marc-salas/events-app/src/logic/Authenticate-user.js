import {validate} from 'events-utils'

export default (email, password) => {
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch('http://localhost:8085/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const _response = await response.json()
        
        if (response.status === 200) return _response.token

        if (response.status === 409 || response.status === 406){

            const error = _response

            throw new Error(error)
        }else throw new Error('Unknown error')
    
    })()
}