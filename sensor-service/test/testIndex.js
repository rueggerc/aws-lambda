"use strict";

// let assert = require('assert');
const assert = require("chai").assert;
const sinon = require("sinon");
const AWS = require("aws-sdk");
const AWSXRay = require("aws-xray-sdk-core");
const index = require("../index");

let event0 = {
  "resource": "/{sensor-id}/collect",
  "httpMethod": "POST",
  "requestContext": {"authorizer": {"principalID": "RaspberryPI:Sensor1"}},
  "pathParameters": {"sensor-type": "RaspberryPI", "Sensor1": "100"},
  "body": "{\"temperature\": 72.33}"
};

let event = {
    "resource": "/sensors/{sensor-id}/collect",
    "path": "/sensors/100/collect",
    "httpMethod": "POST",
    "headers": {
        "Accept": "*/*",
        "accept-encoding": "gzip, deflate",
        "Authorization": "Basic \"3939288fFFF\"",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Host": "o6vomvulhk.execute-api.us-east-1.amazonaws.com",
        "Postman-Token": "83d06267-4ff4-4b68-b86c-e317127e9ebf",
        "User-Agent": "PostmanRuntime/7.13.0",
        "X-Amzn-Trace-Id": "Root=1-5d18d26a-4ee710e4b257d98cf90487ec",
        "X-Forwarded-For": "47.198.211.106",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
        "Accept": [
            "*/*"
        ],
        "accept-encoding": [
            "gzip, deflate"
        ],
        "Authorization": [
            "Basic \"3939288fFFF\""
        ],
        "Cache-Control": [
            "no-cache"
        ],
        "Content-Type": [
            "application/json"
        ],
        "Host": [
            "o6vomvulhk.execute-api.us-east-1.amazonaws.com"
        ],
        "Postman-Token": [
            "83d06267-4ff4-4b68-b86c-e317127e9ebf"
        ],
        "User-Agent": [
            "PostmanRuntime/7.13.0"
        ],
        "X-Amzn-Trace-Id": [
            "Root=1-5d18d26a-4ee710e4b257d98cf90487ec"
        ],
        "X-Forwarded-For": [
            "47.198.211.106"
        ],
        "X-Forwarded-Port": [
            "443"
        ],
        "X-Forwarded-Proto": [
            "https"
        ]
    },
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": {
        "sensor-id": "100"
    },
    "stageVariables": null,
    "requestContext": {
        "resourceId": "2e8icg",
        "resourcePath": "/sensors/{sensor-id}/collect",
        "httpMethod": "POST",
        "extendedRequestId": "cGXQlGT-IAMFsTA=",
        "requestTime": "30/Jun/2019:15:16:58 +0000",
        "path": "/dev/sensors/100/collect",
        "accountId": "566851869399",
        "protocol": "HTTP/1.1",
        "stage": "dev",
        "domainPrefix": "o6vomvulhk",
        "requestTimeEpoch": 1561907818163,
        "requestId": "1a3d70b5-9b4a-11e9-9240-61bf77af059c",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "sourceIp": "47.198.211.106",
            "principalOrgId": null,
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "PostmanRuntime/7.13.0",
            "user": null
        },
        "domainName": "o6vomvulhk.execute-api.us-east-1.amazonaws.com",
        "apiId": "o6vomvulhk"
    },
    "body": "{\n\t\"sensorID\": \"sensor1\",\n\t\"notes\": \"Living Room\",\n\t\"temperature\": 72.58,\n\t\"humidity\": 83.24,\n\t\"timestamp\": 1562407277550\n}",
    "isBase64Encoded": false
};

// Environment Variables
process.env.S3_BUCKET_NAME="myBucket";

process.env.DB_HOST = "localhost";
process.env.DB_USER = "chris";
process.env.DB_PASSWORD = "dakota";
process.env.DB_PORT = "5432";
process.env.DB_DATABASE = "rueggerllc";

// process.env.DB_HOST = "captain";
// process.env.DB_USER = "chris";
// process.env.DB_PASSWORD = "dakota";
// process.env.DB_PORT = "5432";
// process.env.DB_DATABASE = "rueggerllc";


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