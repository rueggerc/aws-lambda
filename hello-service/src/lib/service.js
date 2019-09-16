// const AWSXRay = require('aws-xray-sdk-core');
// const AWS = AWSXRay.captureAWS(require('aws-sdk'));



const AWS = require('aws-sdk');
const utils = require('./lib/utils');
const awsParameterStore = require('aws-param-store');

module.exports.handler = (event,context,callback) => {
  console.log("HELLO-SERVICE BEGIN");
  this.asyncHandler(event,context,callback).then();
};

module.exports.asyncHandler = async (event,context,callback) => {
  try {
 
    let data = {
        msg: "Hello From The hello-service!",
    };
    
    let deployEnv = process.env.DEPLOY_ENV;
    let parametersPrefix = `/rueggerllc/sensors/${deployEnv}`;
    data["DEPLOY_ENV"] = deployEnv;

    // Business Logic
    let parameterMap = new Map();
    // let parameters = await awsParameterStore.getParametersByPath("/rueggerllc/sensors/dev");
    let parameters = await awsParameterStore.getParametersByPath(parametersPrefix);
    // console.log("ALL PARAMETERS=" + JSON.stringify(parameters,null,2));
    for (let i = 0; i < parameters.length; i++) {
      console.log(`${parameters[i].Name} ${parameters[i].Value}`);
      let parmName = getParmName(parameters[i].Name);
      data[parmName] = parameters[i].Value;
      parameterMap.set(parmName,parameters[i].Value);
    }

    console.log("Data=\n" + JSON.stringify(data,null,2));

    // Get the Bucket Name
    // let bucketName = parameterMap.get("bucketname");
    // console.log("BUCKET NAME IS:" + bucketName);
    // data["BUCKET-NAME-FROM-MAP"] = bucketName;



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


  function getParmName(path) {
    let lastSlashPos = path.lastIndexOf("/");
    let parmName = path.substring(lastSlashPos+1);
    return parmName;
  }

};

