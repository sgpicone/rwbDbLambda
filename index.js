var mysql = require('mysql');
var beerQueries = require('./beerQueries');
var kegQueries = require('./kegQueries');

process.env.DB_HOST = '165.227.177.157'
process.env.DB_PORT = '32947'
process.env.DB_USER = 'rwbbc_rw'
process.env.DB_PASS = 'ASdot786ASdot786'

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

connection.connect();

beerQueries.getBeers(connection);
beerQueries.getBeerById(connection, 1);
kegQueries.getKegs(connection);

exports.handler = (event, context) => {
    // connection.query("SELECT * FROM rwbbc.beers", function(err, rows, fields) {
    //     console.log("rows: " + JSON.stringify(rows));
    //     context.succeed('Success');
    // });
    

};