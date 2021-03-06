import Ember from 'ember';

export default Ember.Route.extend({

	
	
	/*model: function(params) {
		// super easy hack, just use ajax calls, load into one big model
		var modelObj = {};

		Ember.$.getJSON('assets/data/data-sources.json', function(data) {			
			Ember.set(modelObj,'dataSources',data);
		});

		Ember.$.getJSON('assets/data/graph-options.json', function(data) {
			Ember.set(modelObj,'graphOptions',data);
		});
	}*/

	// this one almost works and uses the store... figure out promises
	model: function(params) {	

		// always use Ember objects, not simple js ones
		var modelObj = Ember.Object.create();

		// data sources and graph options are same for all routes
		modelObj.set('datasources',this.store.findAll('datasource'));
		modelObj.set('graphOptions',this.store.findAll('graph-option'));

		if(params.tolaboard_id !== 'new') {
			
			modelObj.set('dashboard',this.store.findRecord('dashboard',params.tolaboard_id));			
		}
		else {
			// it's new... we need empty object to add items to
			var dummyObj = Ember.Object.create();
			dummyObj.set('items',[]);
			modelObj.set('dashboard',dummyObj);
		}

		console.log('modelObj',modelObj);
		return modelObj;
		
	}
	/*model: function(params) {
		
		var modelObj = {};
		Ember.set(modelObj,'tbID',params);
		Ember.set(modelObj,'testArr',[34,45,56]);

		Ember.set(modelObj,'testTB',{
			"id": 0,
			"title": "RRIMA Primary Dashboard",
			"dashboard": [{"widget": {"col":4,"row":1,"size_x":3,"size_y":3},
						   "graph": {"component": "graphs/test-graph", "data": [], 
						   				 "config" : {"type": "bar",
						   				 			 "data": {
						   				 			 	"labels": ["A", "B", "C"],
						   				 			 	"datasets": [{
						   				 			 		"data": [34,23, 78],
						   				 			 		"backgroundColor": "#00afaa"
						   				 			 		}]
						   				 			 	},
						   				 			 	"options": {}
						   				 		}
						   				 	}
						   		},

						   	{"widget": {"col":1,"row":1,"size_x":3,"size_y":2},
						   "graph": {"component": "graphs/test-graph", "data": [], 
						   				 "config" : {"type": "bar",
						   				 			 "data": {
						   				 			 	"labels": ["X", "Y", "Z"],
						   				 			 	"datasets": [{
						   				 			 		"data": [34,34, 34],
						   				 			 		"backgroundColor": "steelblue"
						   				 			 		}]
						   				 			 	},
						   				 			 	"options": {}
						   				 		}
						   				 	}
						   		}]
		});

		if(params.tolaboard_id === 'new') {
			Ember.set(modelObj,'testTB',{dashboard:[]});
		}

		Ember.set(modelObj,'dataSources',[1,2,3]);
		Ember.set(modelObj,'graphOptions',[]);

		// get the board, special case... id === 'new', don't retrieve anything		
		if(params.tolaboard_id !== 'new') {
			var url = "assets/data/tolaboards/demo-board-" + 
			          params.tolaboard_id + '.json';

			Ember.set(modelObj, 'tolaboard', Ember.$.getJSON(url, function(data) {			
				console.log('designer model ready');

				return data;
			}));		
		}
		

		// first attempt... use static json file storing data sources
		// this becomes a property on the model associated with the designer route
		// the model is passed to the component via injection via the {{}} syntax
		// when the component is inserted into the designer.hbs template

		
		Ember.$.getJSON('assets/data/data-sources.json', function(data) {			
			Ember.set(modelObj,'dataSources',data);
		});

		Ember.$.getJSON('assets/data/graph-options.json', function(data) {
			Ember.set(modelObj,'graphOptions',data);
		});

		console.log('model fn in designer done', modelObj);

		return modelObj;

	}*/
});
