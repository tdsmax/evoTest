'use strict'

var Sys = require('./Sys.js');

// WebSockets API
var webShock = new WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");
webShock.onopen = function(event){
    webShock.send(JSON.stringify({
      "$type": "login",
      "username": "user1234",
      "password": "password1234"
    }));
};
webShock.onmessage = function(event){
    console.log("event");
}
webShock.onerror = function(event){
    console.log("Event error");
}

/*module.exports = webShock;*/