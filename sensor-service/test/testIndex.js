"use strict";

// let assert = require('assert');
const assert = require("chai").assert;
const sinon = require("sinon");
const AWS = require("aws-sdk");
const AWSXRay = require("aws-xray-sdk-core");
const index = require("../index");

let event = {
  "resource": "/{sensor-id}/collect",
  "httpMethod": "POST",
  "requestContext": {"authorizer": {"principalID": "RaspberryPI:Sensor1"}},
  "pathParameters": {"sensor-type": "RaspberryPI", "Sensor1": "100"},
  "body": "{\"temperature\": 72.33}"
};

// Environment Variables
process.env.S3_BUCKET_NAME="myBucket";

let sandbox = undefined;
describe ('Test Index', function() {

  before(function() {
    console.log("BEFORE");
    sandbox = sinon.createSandbox();
    const getSegmentStub = sandbox.stub(AWSXRay,'getSegment');
    const addNewSubsegmentStub = sandbox.stub();
    getSegmentStub.returns({addNewSubsegment: addNewSubsegmentStub});
    const addAnnotationStub = sandbox.stub();
    const addMetadataStub = sandbox.stub();
    const closeStub = sandbox.stub();
    const addErrorStub = sandbox.stub();
    addNewSubsegmentStub.returns({
      addAnnotation: addAnnotationStub,
      addMetadata: addMetadataStub,
      close: closeStub,
      addError: addErrorStub
    })
  });

  after(function() {
    sandbox.restore();
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