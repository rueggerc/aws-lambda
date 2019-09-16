"use strict";

const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");

let event = {
  "resource": "/{sensor-id}/collect",
  "httpMethod": "GET",
  "body": ""
};

// Environment Variables
process.env.S3_BUCKET_NAME="myBucket";
process.env.DB_HOST = "localhost";
process.env.DB_USER = "chris";
process.env.DB_PASSWORD = "dakota";
process.env.DB_PORT = "5432";
process.env.DB_DATABASE = "rueggerllc";

let sandbox = undefined;
describe ('Test Handler', function() {

  before(function() {
    sandbox = sinon.createSandbox();
  });

  after(function() {
    sandbox.restore();
  });


  it('Write Sensor Data to DB', function() {

    index.handler(event,null,null) 
      .then(function(response) {
        // console.log("RESULT=\n" + JSON.stringify(response,null,2));
        assert.equal(response.statusCode,200);
      });

  });

});