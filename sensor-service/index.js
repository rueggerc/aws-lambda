
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const utils = require("./lib/utils");
const dbutils = require("./lib/dbutils");

module.exports.handler = (event,context,callback) => {
  console.log("SENSOR-SERVICE BEGIN");
  this.asyncHandler(event,context,callback).then();
};

module.exports.asyncHandler = async (event,context,callback) => {

  console.log("Sensors Async Handler BEGIN");
  const rootSubSegment = AWSXRay.getSegment().addNewSubsegment("sensors-RootSubSegment");

  try {
    
    console.log("EVENT=\n" + JSON.stringify(event,null,4));

    let pathParameters = event.pathParameters;
    if (pathParameters) {
      console.log("sensor-id in PATH=" + pathParameters['sensor-id']);
      let sensorID = pathParameters['sensor-id'];
      rootSubSegment.addAnnotation("sensorID", sensorID);
    }

    // Access DB
    console.log("ACCESS DB BEGIN");
    let payLoad = JSON.parse(event.body);
    await dbutils.doDatabaseStuff(payLoad);
    console.log("ACCESS DB END");

    let bucketInfo = utils.getBucketInfo();
    // let payloadForS3 = utils.getPayloadForS3(event);
    // let s3 = new AWS.S3();
    // const s3SubSegment = AWSXRay.getSegment().addNewSubsegment("sensors-S3SubSegment");

    // try {
    //   s3SubSegment.addAnnotation("S3FileName", bucketInfo.fileName);
    //   s3SubSegment.addMetadata("S3FileName", bucketInfo.fileName);
    //   await utils.writeToS3(s3,bucketInfo,payloadForS3);
    // } catch (s3Error) {
    //   s3SubSegment.addError(s3Error);
    // } finally {
    //   s3SubSegment.close();
    // }

    let responseText = "sensor1 Written to S3";
    console.log("RESPONSE TEXT=" + responseText);

    // Build Response
    console.log("SUCCESSFUL COMPLETION");
    let message = utils.buildResponse(utils.formatSuccessText(JSON.stringify(responseText)));
    console.log("MESSAGE=" + JSON.stringify(message,null,2));
    callback && callback(null,message);
  } catch (err) {
    let errorMessage = err.toString();
    console.log("ERROR=\n" + err);
    let message = utils.buildResponse(utils.formatErrorText(errorMessage),500);
    callback && callback(null,message);
  } finally {
    rootSubSegment.close();
  }

};

