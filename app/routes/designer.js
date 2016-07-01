import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// return Ember.$.getJSON('cars.json').then(function(data) {
		var modelObj = {};
		Ember.set(modelObj,'dataSources',[1,2,3]);
		Ember.set(modelObj,'graphOptions',[]);

		// first attempt... use static json file storing data sources
		// this becomes a property on the model associated with the designer route
		// the model is passed to the component via injection via the {{}} syntax
		// when the component is inserted into the designer.hbs template

		/* Longterm, we need to have our model make use of data in the store
		   delivered via our adapter. 

		*/
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
