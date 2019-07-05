"use strict";
const PostgresUno = require('postgres-uno');

module.exports.doDatabaseStuff = function() {
    let dbConfig = builddbConfig();

    getSensorData(dbConfig)
      .then(function(result) {
        console.log("getSensorData Process RESULT="+ result);
        let rows = result.rows;
        console.log("ROWS=" + rows);
        for (let i = 0; i < rows.length; i++) {
            let temperature = rows[i].temperature;
            console.log("temperature=" + temperature);
        }
      })
      .catch(function(err) {
        console.log("getSensorData ERROR=" + result);
      });
}

async function getSensorData(dbConfig) {
    try {

        console.log("getSensorData BEGIN");
        let db = new PostgresUno();
        console.log("DBConfig=\n" + JSON.stringify(dbConfig,null,2));
        await db.connect(dbConfig);

        let dbQuery = "select * from dht22_readings limit 10";
        console.log("dbQuery=" + dbQuery);

        // Query
        let result = await db.query(dbQuery);
        // console.log("RESULT=" + JSON.stringify(result.rows));
        let rows = result.rows;
        // console.log("ROWS=" + rows);
        console.log("ROWS LENGTH=" + rows.length);
        // for (let i = 0; i < rows.length; i++) {
        //     let temperature = rows[i].temperature;
        //     console.log("temperature=" + temperature);
        // }
        // let temperature = result.rows[0].temperature;
        // console.log("temperature=" + temperature);

        // Disconnect
        await db.disconnect();

        return result;

    } catch (err) {
        console.log("ERROR=" + err);
        throw new Error(err);
    }
}

function builddbConfig() {
    let db_host = process.env.DB_HOST || throwError("Not Set: DB_HOST");
    let db_user = process.env.DB_USER || throwError("Not Set: DB_USER");
    let db_password = process.env.DB_PASSWORD || throwError("Not Set: DB_PASSWORD");
    let db_port = process.env.DB_PORT || throwError("Not Set: DB_PORT");
    let db_database = process.env.DB_DATABASE || throwError("Not Set: DB_DATABASE");

    let dbConfig = {
        host: db_host,
        user: db_user,
        password: db_password,
        port: db_port,
        database: db_database
    };
    return dbConfig;

}