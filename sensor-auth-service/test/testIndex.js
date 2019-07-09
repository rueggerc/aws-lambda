"use strict";

// let assert = require('assert');
const assert = require("chai").assert;
const sinon = require("sinon");
const AWSXRay = require("aws-xray-sdk-core");
const index = require("../index");


let event = {
};

// Environment Variables


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
      console.log("RESULT=\n" + JSON.stringify(result,null,4));
      // assert.equal(result.statusCode,200);
    }

    index.handler(event,null,callback);

  });



});