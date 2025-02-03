const sql = require('msnodesqlv8');
const connectionString ="";
const poolPromise = new Promise((resolve, reject) => {
    sql.open(connectionString, (err, conn) => {
        if (err) {
            reject('Database Connection Failed: ' + err);
        } else {
            console.log('Connected to SQL Server');
            resolve(conn);
        }
    });
});

module.exports = {
    sql, poolPromise
};