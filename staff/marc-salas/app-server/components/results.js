const Item = require('./item')
module.exports=  function Results({vehicles}) {
    return` <ul className="results">
        ${vehicles.map(item => Item ({item}))}
    </ul>`
}