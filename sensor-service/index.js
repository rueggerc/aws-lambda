
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const utils = require("./lib/utils");

module.exports.handler = (event,context,callback) => {
  console.log("SENSOR-SERVICE BEGIN");
  this.asyncHandler(event,context,callback).then();
};

module.exports.asyncHandler = async (event,context,callback) => {

  console.log("Sensors Async Handler BEGIN");
  const rootSubSegment = AWSXRay.getSegment().addNewSubsegment("sensors-RootSubSegment");

  try {
    // console.log("EVENT=\n" + JSON.stringify(event,null,4));

    let bucketInfo= utils.getBucketInfo();
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

    // Build Response
    console.log("SUCCESSFUL COMPLETION");
    let message = utils.buildResponse(utils.formatSuccessText(JSON.stringify(responseText)));
    callback && callback(null,message);
  } catch (err) {
    let errorMessage = err.toString();
    console.log("ERROR=\n" + err);
    let message = utils.buildResponse(utils.formatErrorText(errorMessage),500);
    callback && callback(null,message);
  }

};

