"use strict";
const commonUtils = require("../src/commonUtils");
const assert = require("chai").assert;

describe ('Test Common Code', function() {
    
    it('Test Say Hello', function() {
      commonUtils.sayHello("Foo") 
        .then(function(response) {
            assert.equal(response,"Foo");
        });
    });

});