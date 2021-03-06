
"use strict";
const utils = require("./utils");
const dbutils = require("./dbutils");
const common = require("../../common/src/commonUtils");

module.exports.execute = async (serviceRequest) => {
  console.log("get-sensor-data service BEGIN");
  try {
  
    // Use Common Code
    await common.sayHello("get-sensor-data");

    // Access DB
    console.log("ACCESS DB BEGIN");
    // let payLoad = JSON.parse(event.body);
    // await dbutils.doDatabaseStuff(payLoad);
    console.log("ACCESS DB END");

    // Build Response
    let responseText = "sensor data retrieved from DB";
    let message = buildResponse(responseText);
    console.log("get-sensor-data service END");
    return message;

  } catch (err) {
    let errorMessage = err.toString();
    console.log("ERROR=\n" + err);
    return buildErrorResponse(errorMessage);
  } finally {
  }

};

function buildResponse(text) {
  let statusCode = 200;
  let response = {
      statusCode: statusCode,
      headers: {"Content-Type": 'application/json'},
      body: text
  };
  return response;
};

function buildErrorResponse(errorMessage) {
  return {
    statusCode: 500,
    body: errorMessage
  };
}
