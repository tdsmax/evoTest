'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var SlotTable = require('./SlotTable.jsx');
	
var GamesLobby = React.createClass({
  render: function() {
  	var maximumSlot = this.props.maximumSlot;
  	var tables = this.props.data.map(function(table,index){
		return (
			<SlotTable key={index}  maximumSlot={maximumSlot} data={table}></SlotTable>	
		);
  	});
    return (
      <div className="GamesLobby">
      	{tables}
      </div>
    );
  }
});

module.exports = GamesLobby;
