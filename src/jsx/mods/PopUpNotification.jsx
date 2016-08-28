'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var AppData = require('../../js/App.js');
var GameRenderer = require('../index.jsx');
var pubSub = require('../../js/PubSub.js');

var connectionReady = function(data){
  AppData.message = "Connection is Ready";
  pubSub.pub('renderUpdate',AppData);
};

var loginSuccessful = function(data){
  AppData.message = "User autheticated joined as a :: " + data.user_type;
  pubSub.pub('renderUpdate',AppData);
};

var loginFailed = function(data){
  AppData.message = "Could not authentucate user";
  pubSub.pub('renderUpdate',AppData);
};

var tabeList = function(data){
  AppData.message = "Got Tables from Server :: " + data.tables.length;
  pubSub.pub('renderUpdate',AppData);
};

var updateFailed = function(data){
  AppData.message = "Could not update Table";
  pubSub.pub('renderUpdate',AppData);
};

var removalFailed = function(data){
  AppData.message = "Could not Remove Table";
  pubSub.pub('renderUpdate',AppData);
};

var tableAdded = function(data){
  AppData.message = "table Added by server after id :: " + data.after_id;
  pubSub.pub('renderUpdate',AppData);
};
var tableRemoved = function(data){
  AppData.message = "Table removed by server :: " + data.id;
  pubSub.pub('renderUpdate',AppData);
};
var tableUpdated = function(data){
  AppData.message = "Table updated confirmed by server id :: " + data.table.id;
  pubSub.pub('renderUpdate',AppData);
};


var userUpdate = function(data){
  AppData.message = "User updating Data on Table with id " + data.id;
  pubSub.pub("renderUpdate",AppData);
}
var addTable = function(data){
  AppData.message = "Trying to add a table after table " + data.id;
  pubSub.pub("renderUpdate",AppData);
}
var removeTable = function(data){
	AppData.message = "Trying to remove Table " + data.id;
  pubSub.pub("renderUpdate",AppData);
}

pubSub.sub("connectionReady",connectionReady);
pubSub.sub('login_successful',loginSuccessful);
pubSub.sub('login_failed',loginFailed);

pubSub.sub('table_list',tabeList);

pubSub.sub('update_failed',updateFailed);
pubSub.sub('removal_failed',removalFailed);

pubSub.sub("table_added",tableAdded);
pubSub.sub("table_removed",tableRemoved);
pubSub.sub("table_updated",tableUpdated);

pubSub.sub("userUpdate",userUpdate);
pubSub.sub("addTable",addTable);
pubSub.sub("removeTable",removeTable);

/** Game Over **/
pubSub.sub('quitConnection',function(data){
  AppData.message = data;
  pubSub.pub("renderUpdate",AppData);
});

var PopUpNotification = React.createClass({
  render: function() {
    return (
      <div className="PopUpNotification">
      	{this.props.data}
      </div>
    );
  }
});


module.exports = PopUpNotification;


