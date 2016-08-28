var PubSub={events:{},sub:function(e,a){this.events[e]=this.events[e]||[],this.events[e].push(a)},unsub:function(e,a){if(this.events[e])for(var t=0;t<this.events[e].length;t++)if(this.events[e][t]===a){this.events[e].splice(t,1);break}},pub:function(e,a){this.events[e]&&this.events[e].forEach(function(e){e(a)})}};module.exports=PubSub,define("PubSub.js",function(){});var Sys=require("./Sys.js"),pubSub=require("./PubSub.js"),webShock=new WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");webShock.onopen=function(e){pubSub.pub("connectionReady",e)},webShock.onmessage=function(e){var a=JSON.parse(e.data);switch(a.$type){case"login_successful":pubSub.pub("login_successful",a);break;case"login_failed":pubSub.pub("login_failed",a);break;case"pong":pubSub.pub("pong",a);break;case"table_list":pubSub.pub("table_list",a);break;case"update_failed":pubSub.pub("update_failed",a);break;case"removal_failed":pubSub.pub("removal_failed",a);break;case"table_added":pubSub.pub("table_added",a);break;case"table_removed":pubSub.pub("table_removed",a);break;case"table_updated":pubSub.pub("table_updated",a);break;default:console.log("SocketApi.js :: Caught an unhandled server response !!")}console.log(JSON.parse(e.data))},webShock.onerror=function(e){console.log("Event error")},module.exports=webShock,define("SocketApi.js",function(){});var pubSub=require("./PubSub.js"),webShock=require("./SocketApi.js"),AppData={message:"User Logges in",tables:[{id:1,name:"table - Mission Impossible",participants:5},{id:2,name:"table - Mission Impossible 2",participants:11},{id:3,name:"table - Mission Impossible 3",participants:3},{id:4,name:"table - Mission Impossible 4",participants:8}],maximumSlot:function(e){for(var a=[],t=1;e>=t;t++)a.push(t);return a}};pubSub.sub("connectionReady",function(e){webShock.send(JSON.stringify({$type:"login",username:"user1234",password:"password1234"}))}),pubSub.sub("login_successful",function(e){webShock.send(JSON.stringify({$type:"subscribe_tables"}))}),pubSub.sub("login_failed",function(e){console.log("data:: From Server"+e)}),pubSub.sub("pong",function(e){console.log("data:: From Server"+e)}),pubSub.sub("table_list",function(e){AppData.tables=e.tables,pubSub.pub("renderUpdate",AppData)}),pubSub.sub("update_failed",function(e){console.log("data:: From Server"+e)}),pubSub.sub("removal_failed",function(e){console.log("data:: From Server"+e)}),pubSub.sub("table_added",function(e){var a=e.after_id,t=AppData.tables.findIndex(function(e){return e.id==a});-1!==t&&(t=AppData.tables.findIndex(function(e){return e.id==a}),AppData.tables.splice(t+1,0,e.table),AppData.tables.join(),pubSub.pub("renderUpdate",AppData),pubSub.pub("TableAddedServer",e.table))}),pubSub.sub("table_removed",function(e){var a=e.id,t=AppData.tables.length;AppData.tables=AppData.tables.filter(function(e){return e.id!==a}),t>AppData.tables.length&&pubSub.pub("renderUpdate",AppData)}),pubSub.pub("table_updated",function(e){console.log("data:: From Server"+e)}),pubSub.sub("userUpdate",function(e){var a=e.id,t=AppData.tables.findIndex(function(e){return e.id==a});-1!==t?(AppData.tables[t]=e,pubSub.pub("renderUpdate",AppData),pubSub.pub("userUpdateSuccess",AppData)):pubSub.pub("userUpdateFail",AppData)}),pubSub.sub("removeTable",function(e){var a=e.id,t=AppData.tables.length;AppData.tables=AppData.tables.filter(function(e){return e.id!==a}),t>AppData.tables.length&&pubSub.pub("renderUpdate",AppData)}),pubSub.sub("addTable",function(e){var a=e.id+1,t=AppData.tables.findIndex(function(e){return e.id==a});-1===t&&(a=e.id,t=AppData.tables.findIndex(function(e){return e.id==a}),AppData.tables.splice(t+1,0,{id:e.id+1,name:e.name,participants:e.participants}),AppData.tables.join(),pubSub.pub("renderUpdate",AppData))}),module.exports=AppData,define("App.js",function(){});