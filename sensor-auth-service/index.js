
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));


module.exports.handler = function (event,context,callback) {

  console.log("Sensor-Auth-Service BEGIN");

  let policy = null;

  try {
    
    console.log("==== AUTHORIZATION LAMBDA BEGIN====");
    console.log("EVENT=\n" + JSON.stringify(event,null,4));

    // Get the Authorization Token and Endpoint
    let token = event.authorizationToken;
    let resource = event.methodArn;

    // Get the policy
    policy = generatePolicy(resource,token);
    console.log("GOT POLICY=\n" + JSON.stringify(policy));

    // Done
    callback(null, policy);

  } catch (err) {

    // Authentication failure or any failure
    // Results in 401 Error
    console.log("ERROR:\n" + err);
    callback("Unauthorized");
  
  } finally {
  }

};

function generatePolicy(resource,token) {

  let policyDocument = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "execute-api:Invoke",
        "Effect": "Allow",
        "Resource": resource
      }
    ]
  };

  return policyDocument;

}

