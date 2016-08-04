import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {

		var url = "assets/data/tolaboards/demo-board-" + 
		          params.tolaboard_id + '.json';

		return Ember.$.getJSON(url, function(data) {			
			return data;
		});		
	}

});