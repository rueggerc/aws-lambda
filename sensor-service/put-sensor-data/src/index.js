"use strict";
const service = require("./service");

module.exports.handler = async (event,context,callback) => {
  try {
    let serviceRequest = {};
    return service.execute(serviceRequest); 
  } catch (err) {
    return buildErrorResponse(err.toString());
  } finally {
  }
};

function buildErrorResponse(errorMessage) {
  return {
    statusCode: 500,
    body: errorMessage
  };
}

