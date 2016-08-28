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
	var data = JSON.parse(event.data)
	switch (data.type){
		case: "login_successful"
			pubSub.pub('login_successful',data);
		break;
		case: "login_failed"
			pubSub.pub('login_failed',data);
		break;
		case: "pong"
			pubSub.pub('pong',data);
		break;
		case: "table_list"
			pubSub.pub('table_list',data);
		break;
		case: "update_failed"
			pubSub.pub('update_failed',data);
		break;
		case: "removal_failed"
			pubSub.pub('removal_failed',data);
		break;
		case: "table_added"
			pubSub.pub('table_added',data);
		break;
		case: "table_removed"
			pubSub.pub('table_removed',data);
		break;
		case: "table_updated"
			pubSub.pub('table_updated',data);
		break;
		default 
			console.log("SocketApi.js :: Caught an unhandled server response !!");
		break;
	}
    console.log(JSON.parse(event.data));
}
webShock.onerror = function(event){
    console.log("Event error");
}

module.exports = webShock;