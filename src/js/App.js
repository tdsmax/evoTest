'use strict'

// This File will contiain app 

var pubSub = require('./PubSub');

var userUpdate = function(data){
	console.log("User Update data in App.js");
	console.log(data);
}
pubSub.sub("userUpdate",userUpdate);

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
			id: 5,
			name: "table - Mission Impossible 5",
			participants: 8
		}
	],
	maximumSlot: function(slots){
		var temp = [];
		for(var i=1;i<=slots;i++){
			temp.push(i);
		}
		return temp;
	},
	cacheObjects: function(data){
		var newData = {}; 
		for(var i=0;i<data.length;i++){
			newData[data[i].id] = data[i]
		} 
		return newData;
	}
}

/** Convert array objects into a Hash Map for Easy Manipulation **/
AppData.cacheTable = AppData.cacheObjects(AppData.tables);


module.exports = AppData;