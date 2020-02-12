function toogleRankingBeer(token, idBeer, rankPunt, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof idBeer !== 'number') throw new TypeError(`${idBeer} is not a number`)
    if (typeof rankPunt !== 'number') throw new TypeError(`${rankPunt} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content)

        let { rank } = user

        if (!rank)
            rank = [idBeer], [rankPunt]

        else
            rank.includes(idBeer, rankPunt) ? rank.filter((id, punt) => id !== idBeer && punt !== rankPunt) : rank.push(idBeer, rankPunt)

        call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rank })
        }, (error, response) => {
            if (error) return callback(error)

            callback(error, response)
        })
    })
}