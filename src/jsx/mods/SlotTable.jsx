'use strict';

var React = require('react');
var pubSub = require('../../js/PubSub.js');
var renderId;

var SlotTable = React.createClass({
  onRemove: function(event){
    pubSub.pub("userRemove", this.props.data);
    console.log(this.props.data.id);
    console.log('remove');
  },
  onUpdate: function(event){
    console.log(event);
    pubSub.pub("userUpdate", this.props.data);
    console.log(this.props.data.id);
    console.log('update');
  },
  render: function() {
    var renderId = this.props.renderId;
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
      <div className="slotTable">
          <div className="closeIcon" onClick={this.onRemove}>X</div>
          <div className="titleName">{name}</div>
          <div className="participants">
            {participants}
          </div>
      </div>
    );
  }
});
/*
var _renderSlotTable = function(data){
  ReactDOM.render(
    <SlotTable data={data}/>,
    document.getElementById(renderId)
  );
}
*/


module.exports = SlotTable;
