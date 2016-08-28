'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var SlotTable = require('./SlotTable.jsx');
var pubSub = require('../../js/PubSub.js');

var userUpdate = function(data){
	console.log("User Update data in GamesLobby.jsx");
	console.log(data);
}
pubSub.sub("userUpdate",userUpdate);


var renderId;
	
var GamesLobby = React.createClass({
  render: function() {
  	renderId = this.props.renderId;
  	var maximumSlot = this.props.maximumSlot;
  	var tables = this.props.data.map(function(table,index){
		return (
			<div key={index} className="SlotTable" id={'slotTable'+table.id}>
				<SlotTable renderId={'slotTable'+table.id} maximumSlot={maximumSlot} data={table}></SlotTable>
			</div>
		);
  	});
    return (
      <div className="GamesLobby">
      	{tables}
      </div>
    );
  }
});

var _renderGameLobby = function(data){
	ReactDOM.render(
	  <GamesLobby data={data}/>,
	  document.getElementById(renderId)
	);
}

module.exports = GamesLobby;
