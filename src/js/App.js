'use strict'
// This File will contiain app
var pubSub = require('./PubSub.js');
var webShock = require('./SocketApi.js');

var AppData = {
	message: "User Logges in",
	tables: [
		{
			id: 1,
			name: "table - Mission Impossible",
			participants: 5
		},
		{
			id: 2,
			name: "table - Mission Impossible 2",
			participants: 11
		},
		{
			id: 3,
			name: "table - Mission Impossible 3",
			participants: 3
		},
		{
			id: 4,
			name: "table - Mission Impossible 4",
			participants: 8
		}
	],
	maximumSlot: function(slots){
		var temp = [];
		for(var i=1;i<=slots;i++){
			temp.push(i);
		}
		return temp;
	}
}


/*** Socket Connection PubSub **/
pubSub.sub('connectionReady',function(data){
	webShock.send(JSON.stringify({
      "$type": "login",
      "username": "user1234",
      "password": "password1234"
    }));
});




/*** Core Api Pub Sub ***/
pubSub.sub('userUpdate',function(data){
	var id = data.id,
	index = AppData.tables.findIndex(function(val){return val.id == id;})
	if(index !== -1){
		AppData.tables[index] = data;
		pubSub.pub("renderUpdate", AppData);
		pubSub.pub("userUpdateSuccess",AppData);	
	}else {
		pubSub.pub("userUpdateFail",AppData);
	}
});

pubSub.sub('removeTable',function(data){
	var id = data.id;
	AppData.tables = AppData.tables.filter(function(val){return val.id !== id;})
	pubSub.pub("renderUpdate", AppData);
});

pubSub.sub('addTable',function(data){
	var id = data.id+1,
	index = AppData.tables.findIndex(function(val){return val.id == id;})
	if(index === -1){
		id = data.id;
		index = AppData.tables.findIndex(function(val){return val.id == id;})

		function setCharAt(str,index,chr) {
		    if(index > str.length-1) return str;
		    return str.substr(0,index) + chr + str.substr(index+1);
		}
		setCharAt(data.name,data.name.indexOf(data.id),data.id+1)
		AppData.tables.splice(index+1, 0, {
			id: data.id+1,
			name: setCharAt(data.name,data.name.indexOf(data.id),data.id+1),
			participants: data.participants
		});
		AppData.tables.join();
	}
	pubSub.pub("renderUpdate", AppData);
});



module.exports = AppData;