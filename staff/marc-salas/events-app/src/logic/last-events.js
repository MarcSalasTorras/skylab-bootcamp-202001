import axios from 'axios'

export default () =>{
    return axios.get('http://localhost:8085/lastevents')
    .then((response) =>{
        return response
    })
}