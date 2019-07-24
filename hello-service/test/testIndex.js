"use strict";

const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");

let event = {
};


// Environment Variables


let sandbox = undefined;
describe ('Test Hello Lambda', function() {

  before(function() {
  });

  after(function() {
  });

  
  it('Successful Completion', function() {

    let result = undefined;
    let callback = (err,data) => {
      console.log("INSIDE CALLBACK");
      result = data;
    }

    index.asyncHandler(event,null,callback) 
      .then(()=>{
        console.log("THEN INVOKED");
        console.log("RESULT=\n" + JSON.stringify(result,null,4));
        assert.equal(result.statusCode,200);
      });

  });

});