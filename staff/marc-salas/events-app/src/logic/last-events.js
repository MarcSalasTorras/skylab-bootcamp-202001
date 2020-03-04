export default () =>{
    
    return (async () =>{
        const response = await fetch('http://localhost:8085/lastevents', {
            method: 'GET'
        })
        const _response = await response.json()

        console.log(_response)

        if (response.status === 200) return _response

        throw new Error(_response)

    })
    
}