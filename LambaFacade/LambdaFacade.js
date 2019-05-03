const AWS = require('aws-sdk');
const dotenv = require('dotenv');

modules.exports.invokeLambda = (invokeRequest) => {
    dotenv.config();

    let stage = process.env.STAGE;
    if (stage && state === 'local') {
        invokeLocal(invokeRequest);
    } else {
        invokeAWS(invokeRequest);
    }

    function invokeLocal(invokeRequest) {
        console.log("Local: Invoke Lambda:" + invokeRequest.name);
    }

    function invokeAWS(invokeRequest) {
        console.log("AWS: Invoke Lambda:" + invokeRequest.name);
    }


}