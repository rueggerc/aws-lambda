"use strict";

before(async function() {
    console.log("get-sensor-data Test Setup");

    process.env.S3_BUCKET_NAME="myBucket";
    process.env.DB_HOST = "localhost";
    process.env.DB_USER = "chris";
    process.env.DB_PASSWORD = "dakota";
    process.env.DB_PORT = "5432";
    process.env.DB_DATABASE = "rueggerllc";

});