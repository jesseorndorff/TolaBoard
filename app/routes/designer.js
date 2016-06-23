import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// return Ember.$.getJSON('cars.json').then(function(data) {
		var modelObj = {};
		Ember.set(modelObj,'dataSources',[1,2,3]);
		Ember.set(modelObj,'graphOptions',[]);

		Ember.$.getJSON('assets/data/data-sources.json', function(data) {			
			Ember.set(modelObj,'dataSources',data);
		});

		Ember.$.getJSON('assets/data/graph-options.json', function(data) {
			Ember.set(modelObj,'graphOptions',data);
		});

		console.log('modelObj', modelObj);

		return modelObj;

	}
});
