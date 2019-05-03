"use strict";

let lambdaFacade = require('./LambdaFacade');

let invokeRequest = {
    name: "LambdaA"
};
lambdaFacade.invokeLambda(invokeRequest);

let invokeRequest = {
    name: "LambdaB"
};
lambdaFacade.invokeLambda(invokeRequest);

