module.exports = function Details( { name, id, image, year, price, description, url}, username, query) {
    return `<li className="detail">
        <h3>${name}</h3>
        <a href="/search/${username}?query=${query}">GoBack</a>
        <figure>
            <img src=${image} />
        </figure>
        <span>${price} €</span>
        <p>Year: ${year}</p>
        <p>Description: ${description}</p>
        <a href=${url}>Link to URL: ${url} </a>
    </li>`

}

