"use strict";

module.exports.sayHello = async function(serviceName) {
    console.log(`HELLO FROM COMMON CODE: ${serviceName}`);
    return serviceName;
}