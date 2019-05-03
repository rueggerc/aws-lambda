
const AWS = require('aws-sdk');

module.exports.getBuckets = (callback) => {
    let S3 = new AWS.S3({region: "us-east-1"});
    var params  = {};
    S3.listBuckets(params,s3Callback);

    function s3Callback(error,data) {
        if (error) {
            console.log("ERROR=" + error);
            return;
        }
        if (data) {
            callback(data.Buckets);
        }
    }

};

module.exports.getFilteredBuckets = (filterSpec,callback) => {
    let S3 = new AWS.S3({region: "us-east-1"});
    var params  = {};
    S3.listBuckets(params,filterCallback);

    function filterCallback(error,data) {
        if (error) {
            console.log("ERROR=" + error);
            return;
        }
        if (data) {
            let buckets = filterBuckets(filterSpec,data.Buckets);
            callback(filterSpec,buckets);
        }
    }    
};

function filterBuckets(filterSpec, allBuckets) {
    let buckets = [];
    for (var i = 0; i < allBuckets.length; i++) {
        if (allBuckets[i].Name.indexOf(filterSpec) !== -1) {
            buckets.push(allBuckets[i]);
        }
    }
    return buckets;
}