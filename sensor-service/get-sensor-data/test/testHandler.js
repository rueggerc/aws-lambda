"use strict";

const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");

let event = {
  "resource": "/{sensor-id}/collect",
  "httpMethod": "GET",
  "body": ""
};

let sandbox = undefined;
describe ('Test Handler', function() {

  before(function() {
    sandbox = sinon.createSandbox();
  });

  after(function() {
    sandbox.restore();
  });


  it('Retrieve Sensor Data From DB', function() {

    index.handler(event,null,null) 
      .then(function(response) {
        // console.log("RESULT=\n" + JSON.stringify(response,null,2));
        assert.equal(response.statusCode,200);
      });

  });

});