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
		AppData.currentData = {
			$type : 'update_table',
			table : data
		}
		AppData.tables[index] = data;
		pubSub.pub("renderUpdate", AppData);
		webShock.send(JSON.stringify(AppData.currentData));	
	}
});

pubSub.sub('removeTable',function(data){
	var id = data.id, len = AppData.tables.length;
	AppData.tables = AppData.tables.filter(function(val){return val.id !== id;})
	if(len > AppData.tables.length){
		AppData.currentData = {
			$type: "remove_table",
			table: data
		} 
		webShock.send(JSON.stringify({
			$type: "remove_table",
			id: id
		}));
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

/** Game Over **/
var closeMe = function(data){
	webShock.send('unsubscribe_tables');
	webShock.close();
	pubSub.unsub('quitConnection',closeMe);
}
pubSub.sub('quitConnection',closeMe);



module.exports = AppData;