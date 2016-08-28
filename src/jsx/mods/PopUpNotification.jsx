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
var userUpdate = function(data){
  AppData.message = "User Data on Table with id " + data.id + " is updated";
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
pubSub.sub("userUpdate",userUpdate);
pubSub.sub("addTable",addTable);
pubSub.sub("removeTable",removeTable);

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


