
const getBeers = (connection) => {
    connection.query("SELECT * FROM rwbbc.beers", function(err, rows, fields) {
        console.log("rows: " + JSON.stringify(rows));
    });
}

const getBeerById = (connection, id) => {
    connection.query(`SELECT * FROM rwbbc.beers WHERE id = ${id}`, function(err, rows, fields) {
        console.log(JSON.stringify(rows));
    });
}


module.exports = {
    getBeers : getBeers,
    getBeerById : getBeerById
}