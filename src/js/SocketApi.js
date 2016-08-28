'use strict'

var Sys = require('./Sys.js');
var pubSub = require('./PubSub.js');

// WebSockets API
var webShock = new WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");
webShock.onopen = function(event){
	console.log('event : ' + event.data);
	pubSub.pub("connectionReady",event);
};
webShock.onmessage = function(event){
    console.log(JSON.parse(event.data));
}
webShock.onerror = function(event){
    console.log("Event error");
}

module.exports = webShock;