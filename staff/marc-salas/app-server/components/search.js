const Results = require('./results')
module.exports = function Search(props = {}) {
    const {error, query ="", username, vehicles = undefined, fav} = props

    return `<h1> Search</h1> <p> by ${username} </p>
    <form action="/logout" method="POST">
        <button> Logeout </button>
    </form>
    <form action="/favorites/${username}" method="GET">
        <button> Favorites </button>
    </form>
    <form action="/search/${username}" method="GET">
        <input type="text" name="query" value="${query}">
        <button>Search</button>
        ${error ? `<p>${error}</p>` : ''}
    </form>
    ${vehicles? Results({vehicles, fav}) : ""}
    `

}
