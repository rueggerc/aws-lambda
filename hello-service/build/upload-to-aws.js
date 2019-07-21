"use strict";

const AWS = require('aws-sdk');
const fs = require('fs');
const minimist = require('minimist');
const FUNCTION_NAME = "HELLO-SERVICE";
const LAMBDA_NAME = `${FUNCTION_NAME}`;
const DELIVERABLE = `${FUNCTION_NAME}.zip`;


const VALID_ENVIRONMENTS = ['dev','prod'];
let environment = 'dev';

if (!VALID_ENVIRONMENTS.includes(environment)) {
    console.log('invalid environment passed');
    process.exit(1);
}

console.log(`Using environments ${environment}`);

let lambda = new AWS.Lambda({region: "us-east-1"});
lambda.updateFunctionCode({
        FunctionName: LAMBDA_NAME,
        ZipFile: fs.readFileSync(`deliverable/${DELIVERABLE}`)
    }).promise()
  .then((data) => {
      console.log("Successfully Update Lambda Function");
      console.log("Details:");
      console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });