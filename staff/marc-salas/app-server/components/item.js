module.exports = function Item({ item: { id, name, thumbnail, price, isFav, image }}) {
    return `<li>
    <form action="/details/${id}" method="GET">
        <h3>${name}</h3>
        <button>
        <img src="${thumbnail || image}"/>
        </button>
        <span>${price} €</span>
    </form>
    <form action="/toggle-fav/${id}" method="POST">
    <button>    
    ${isFav? `5` : `0`}
    </button>
    </form>
    </li>`
}