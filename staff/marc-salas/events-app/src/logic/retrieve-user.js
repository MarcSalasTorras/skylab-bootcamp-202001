import { validate } from 'events-utils'

export default (token) => {
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch('http://localhost:8085/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const _response = await response.json()

        if (response.status === 200) return _response

        if (response.status === 401)

            throw new Error(_response)
        if (response.status === 404 )

            throw new Error(_response)
        if (response.status === 403 )

            throw new Error(_response)
        if (response.status === 400)

            throw new Error(_response)

    })()
} 