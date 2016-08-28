'use strict';

var React = require('react');
var pubSub = require('../../js/PubSub.js');

var SlotTable = React.createClass({
  onRemove: function(event){
    pubSub.pub("removeTable", this.props.data);
  },
  onUpdate: function(event){
    var state = event.currentTarget.getAttribute('data-state');
    var participants = this.props.data.participants;
    this.props.data.participants = state === 'active' ? participants - 1 : participants + 1;
    pubSub.pub("userUpdate", this.props.data);
  },
  onAdd: function(event){
    pubSub.pub("addTable",this.props.data);
  },
  render: function() {
    var onUpdate = this.onUpdate;
    var data = this.props.data;
    var activeParticipants = data.participants;
    var name = data.name.split('-').length > 1 ? data.name.split('-')[1] : data.name;
    var participants = this.props.maximumSlot.map(function(participant,i){
        var active = participant > activeParticipants ? 'deactive' : 'active'
        return (
            <div key={i} onClick={onUpdate} data-state={active} className={'user ' + active}>{participant}</div>
        );
    }); 
    return (
      <div className="SlotTable">
          <div className="closeIcon" onClick={this.onRemove}>X</div>
          <div className="titleName">{name}</div>
          <div className="participants">
            {participants}
          </div>
          <div className="addIcon" onClick={this.onAdd}>+</div>
      </div>
    );
  }
});


module.exports = SlotTable;
