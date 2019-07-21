const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const utils = require('./lib/utils');

module.exports.handler = (event,context,callback) => {
  console.log("HELLO-SERVICE BEGIN");
  this.asyncHandler(event,context,callback).then();
};

module.exports.asyncHandler = async (event,context,callback) => {
  try {
    
    // Business Logic
  
    // Done
    let data = {
      msg: "Hello From Ruegger Lambda!"
    };
    let response = {
      statusCode: 200,
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(data)
    }

    callback && callback(null,response);
  } catch (err) {
    let errorMessage = err.toString();
    console.log("ERROR=\n" + err);
    let message = utils.buildResponse(utils.formatErrorText(errorMessage),500);
    callback && callback(null,message);
  } finally {
  }

};

