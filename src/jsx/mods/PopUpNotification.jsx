'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var AppData = require('../../js/App.js');
var GameRenderer = require('../index.jsx');
var pubSub = require('../../js/PubSub.js');
var renderId;

var userUpdate = function(data){
	AppData.message = "User Data on Table with id " + data.id + " is updated";
  pubSub.pub("renderUpdate",AppData);
}
pubSub.sub("userUpdate",userUpdate);

var PopUpNotification = React.createClass({
  render: function() {
  	renderId = this.props.renderId;
    return (
      <div className="PopUpNotification">
      	{this.props.data}
      </div>
    );
  }
});

/*var _renderPopupNotification = function(data){
	ReactDOM.render(
	  <PopUpNotification data={data}/>,
	  document.getElementById(renderId)
	);
}*/


module.exports = PopUpNotification;


