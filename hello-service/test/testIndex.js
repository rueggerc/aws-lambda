"use strict";

const assert = require("chai").assert;
const sinon = require("sinon");
const index = require("../src/index");
const cksum = require('cksum');
const crc32 = require('crc-32');

let event = {
};


// Environment Variables


let sandbox = undefined;
describe ('Test Hello Lambda', function() {

  before(function() {
  });

  after(function() {
  });


  it('cksum Posix', function() {
    let buffer = cksum('SheetJS');
    let thecrc = parseInt(buffer.toString('hex'),16);
    console.log(thecrc);

    thecrc = buffer.readUIntBE(0, 4);
    console.log(thecrc);
  });

  xit('CRC32', function() {

    let fileContents = "SheetJS";
    let foo = crc32.str("SheetJS");
    console.log(foo);

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