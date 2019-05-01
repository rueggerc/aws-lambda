"use strict";

const AWS = require('aws-sdk');
const fs = require('fs');
const minimist = require('minimist');
const FUNCTION_NAME = "OrderService";
const ZIP_NAME = "lambda1";


const VALID_ENVIRONMENTS = ['dev','prod'];
// let options = minimist(process.argv.slice(2), knownOptions);
// let environment = options.env;
let environment = 'dev';

if (!VALID_ENVIRONMENTS.includes(environment)) {
    console.log('invalid environment passed');
    process.exit(1);
}

console.log(`Using environments ${environment}`);

let lambda = new AWS.Lambda({region: "us-east-1"});
let s3 = new AWS.S3({region: "us-east-1"});

lambda.updateFunctionCode({
        FunctionName: FUNCTION_NAME,
        // ZipFile: fs.readFileSync(`deliverable/${FUNCTION_NAME}.zip`)
        ZipFile: fs.readFileSync(`deliverable/${ZIP_NAME}.zip`)
    }).promise()
  .then((data) => {
      console.log("Successfully Update Lambda Function");
      console.log("Details:");
      console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });