"use strict";

let lambda = require('../index');

const callback = (error,data) => {
  if (error) {
      console.log("ERROR");
      console.log(error);
  }
   else {
    console.log(data);
   }
};


let event = {
  "name": "Fred",
  "age": 35
};

lambda.handler(event,null,callback);