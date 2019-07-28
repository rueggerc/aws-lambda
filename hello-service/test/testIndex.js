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


  xit('cksum Posix', function() {
    let buffer = cksum('SheetJS');
    let thecrc = parseInt(buffer.toString('hex'),16);
    console.log(thecrc);

    thecrc = buffer.readUIntBE(0, 4);
    console.log(thecrc);
  });

  it('Parse Path', function() {
    console.log("HERE WE GO");
    let path = "/rueggerllc/sensors/dev/bucketname";
    console.log("bucketname=" + getParmName(path));
  });

 

  xit('Map Functions', function() {

    try {
      let map1 = new Map();
      map1.set("pet1", "Captain");
      map1.set("pet2", "Norbert");
      map1.set("pet3", "Birman");

      let pet1 = map1.get("pet1");
      console.log("PET1=" + pet1);

      for (let nextKey of map1.keys()) {
        console.log("nextKey=" + nextKey);
      }

      for (let nextElement of map1.entries()) {
        console.log("nextElement=" + nextElement);
      }


    } catch (err) {
      console.log("ERROR: " + err);
    }

  });

  
  xit('Successful Completion', function() {

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

  function getParmName(path) {
    let lastSlashPos = path.lastIndexOf("/");
    let parmName = path.substring(lastSlashPos+1);
    return parmName;
  }

});