import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {

		var url = "assets/data/tolaboards/collection-tolaboards.json";

		return this.store.findRecord('dashboard', params.tolaboard_id);
	}


});
