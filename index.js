var mysql = require('mysql');
var beerQueries = require('./beerQueries');
var kegQueries = require('./kegQueries');



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
    switch(event.path) {
        case '/kegs':
            kegQueries.query(event);
            break;
        case '/beers':
            break;
        default:
            break;
    }
    // connection.query("SELECT * FROM rwbbc.beers", function(err, rows, fields) {
    //     console.log("rows: " + JSON.stringify(rows));
    //     context.succeed('Success');
    // });
    

};