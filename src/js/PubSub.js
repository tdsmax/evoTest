var PubSub  =  {
	events: {},
	sub: function(evName, fn){
		this.events[evName] = this.events[evName] || [];
		this.events[evName].push(fn)
	},
	unsub: function(evName, fn){
		if(this.events[evName]){
			for(var i=0;i<this.events[evName].length;i++){
				if(this.events[evName][i] === fn){
					this.events[evName].splice(i,1);
					break;
				}
			}
		}
	},
	pub: function(evName, data){
		if(this.events[evName]){
			this.events[evName].forEach(function(fn){
				fn(data);
			});
		}
	}
}

module.exports = PubSub;