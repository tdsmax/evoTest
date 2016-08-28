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
      $type: "login",
      username: "user1234",
      password: "password1234"
    }));
});
pubSub.sub('login_successful',function(data){
	webShock.send(JSON.stringify({
      $type: "subscribe_tables"
    }));
});
pubSub.sub('login_failed',function(data){
	console.log("data:: From Server" + data);
});
pubSub.sub('pong',function(data){
	console.log("data:: From Server" + data);
});
pubSub.sub('table_list',function(data){
	AppData.tables = data.tables;
	pubSub.pub('renderUpdate',AppData);
});
pubSub.sub('update_failed',function(data){
	console.log("data:: From Server" + data);
});
pubSub.sub('removal_failed',function(data){
	console.log("data:: From Server" + data);
});
pubSub.sub('table_added',function(data){
	var id = data.after_id,
	index = AppData.tables.findIndex(function(val){return val.id == id;})
	if(index !== -1){
		index = AppData.tables.findIndex(function(val){return val.id == id;});
		AppData.tables.splice(index+1, 0, data.table);
		AppData.tables.join();
		pubSub.pub("renderUpdate", AppData);
		pubSub.pub('TableAddedServer',data.table);
	}
});
pubSub.sub('table_removed',function(data){
	var id = data.id, len = AppData.tables.length;
	AppData.tables = AppData.tables.filter(function(val){return val.id !== id;});
	if(len > AppData.tables.length){
		pubSub.pub("renderUpdate", AppData);	
	}
});
pubSub.pub('table_updated',function(data){
	console.log("data:: From Server" + data);
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
	var id = data.id, len = AppData.tables.length;
	AppData.tables = AppData.tables.filter(function(val){return val.id !== id;})
	if(len > AppData.tables.length){
		pubSub.pub("renderUpdate", AppData);	
	}
});

pubSub.sub('addTable',function(data){
	var id = data.id+1,
	index = AppData.tables.findIndex(function(val){return val.id == id;})
	if(index === -1){
		id = data.id;
		index = AppData.tables.findIndex(function(val){return val.id == id;})
		AppData.tables.splice(index+1, 0, {
			id: data.id+1,
			name: data.name,
			participants: data.participants
		});
		AppData.tables.join();
		pubSub.pub("renderUpdate", AppData);
	}
});



module.exports = AppData;