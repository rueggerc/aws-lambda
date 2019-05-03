"use strict";

let bucketLister = require('./BucketLister');

let invokeRequest = {
    name: "LambdaA"
};
bucketLister.getBuckets(callback);


function callback(buckets) {
  let myBuckets = [];
  buckets.forEach((bucket) => {
    myBuckets.push(bucket.Name);
  });

  for (var i = 0; i < myBuckets.length; i++) {
      console.log("Next Bucket Name=" + myBuckets[i]);
  }

};