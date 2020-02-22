const Results = require('./results')
module.exports = function Search(props = {}) {
    const {error, query ="", name, vehicles = undefined} = props

    return `<h1> Search</h1> <p> by ${name} </p>
    <form action="/search/${name}" method="GET">
        <input type="text" name="query" value="${query}">
        <button>Search</button>
        ${error ? `<p>${error}</p>` : ''}
    </form>
    ${vehicles? Results(vehicles) : ""}
    `

}
