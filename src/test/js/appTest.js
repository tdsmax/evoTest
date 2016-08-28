'use strict';

var expect = require('expect');
var Sys = require('./Sys');

// Initial State
expect(
	Sys.isObject({})		
).toEqual(true);
console.log("Test Passed");