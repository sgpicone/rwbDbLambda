
const getKegs = (connection) => {
    connection.query(`SELECT k.*, kwh.LastWashDate, ksh.LastSaniDate, ksales.LastSaleDate, kt.Type
    FROM rwbbc_data.keg_info k
    JOIN rwbbc_data.keg_types kt ON k.KegTypeId = kt.Id
    LEFT JOIN (
        SELECT FK_RWBId, max(WashDate) AS LastWashDate
        FROM rwbbc_data.keg_wash_history
        GROUP BY FK_RWBId 
    ) kwh on k.RWBId = kwh.FK_RWBId 
    LEFT JOIN (
        SELECT FK_RWBId, max(SaniDate) AS LastSaniDate
        FROM rwbbc_data.keg_sani_history
        GROUP BY FK_RWBId 
    ) ksh on k.RWBId = ksh.FK_RWBId 
    LEFT JOIN (
        SELECT FK_RWBId, max(SaleDate) AS LastSaleDate
        FROM rwbbc_data.keg_sale_history
        GROUP BY FK_RWBId 
    ) ksales on k.RWBId = ksales.FK_RWBId`,function(err, rows, fields) {
        console.error(err);
        console.log("rows: " + JSON.stringify(rows));
    });
}

const getKegDetailsById = (connection, id) => {
    connection.query(`SELECT * 
        FROM rwbbc_data.kegs k
        LEFT JOIN rwbbc_data.keg_wash_history kwh ON k.RWBId = kwh.FK_RWBId
        LEFT JOIN rwbbc_data.keg_sani_history ksh ON k.RWBId = ksh.FK_RWBId
        LEFT JOIN rwbbc_data.keg_sale_history ksales ON k.RWBId = ksales.FK_RWBId
        WHERE k.id = ${id}`, function(err, rows, fields) {
        console.log(JSON.stringify(rows));
    });
}

const findKegByRwbId = (connection, rwbId) => {
    connection.query(`SELECT * FROM rwbbc_data.kegs WHERE RWBId = ${rwbId}`, function(err, rows, fields) {
        console.log(JSON.stringify(rows));
    });
}


module.exports = {
    getKegs : getKegs,
    getKegById : getKegDetailsById,
    findKegByRwbId: findKegByRwbId
}