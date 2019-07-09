
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

module.exports.handler = (event,context,callback) => {
    console.log("LIST-BUCKET-SERVICE BEGIN");
    this.asyncHandler(event,context,callback).then();
  };
  
module.exports.asyncHandler = async function (event,context,callback) {

    try {


        let bucketList = [];
        bucketList.push("bucket1");
        bucketList.push("bucket2");
        bucketList.push("bucket3");

        let response = {
            message: "Yo Bud",
            buckets: bucketList
        }

        let message = buildResponse(formatSuccessText(JSON.stringify(response)));
        callback && callback(null,message);

    } catch (err) {

        let errorMessage = err.toString();
        console.log("ERROR=\n" + err);
        let message = buildResponse(formatErrorText(errorMessage),500);
        callback && callback(null,message);    

    } finally {

    };

};

function buildResponse(text,statusCode = 200) {
    let response = {
        statusCode: statusCode,
        headers: {"Content-Type": 'application/json'},
        body: text
    };
    return response;
};

function formatSuccessText(text) {
    let responseMessage = {
        "result:": text,
        "sensorID": 100
    }
    return JSON.stringify(responseMessage);
    return formattedText;
};

function formatErrorText(text) {
    let formattedText = `{error: ${text}}`;
    return formattedText;
};
