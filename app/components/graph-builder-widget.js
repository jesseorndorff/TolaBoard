import Ember from 'ember';

export default Ember.Component.extend({

	/*didInsertElement: function() {
		//initialize component
		this.set('showGraphBuilderWidget',false);
	}*/
	showCreate: false,
	showEdit: false,
	showDesigner: false,
	showDataSourcePreview: false,
	showVizSelection: false,
	showDataModel: false,
	
	scopeData: [], // placeholder for the data populate by getData action
	scopeGraph: '', // holds the current selected graph metadata
	
	/* Experimental - need to do API calls within component 'controller'
	   in order to deal with dynamic data */
	

	actions: {

		toggleDataSourcePreview: function() { 
			this.toggleProperty('showDataSourcePreview');
		},		
		getSiloData: function(silo_id) {
			return Ember.$.getJSON('assets/data/izmir-beneficiary-db.json', function(data) { 
				return data.splice(0,11);
			});
		},
		getData: function(url) {
			var self = this;
			this.toggleProperty('showDataSourcePreview');
			this.toggleProperty('showVizSelection');

			// this is working... updating scopeData property in callback
			Ember.$.getJSON(url, function(data) { 					
				self.set('scopeData', data.splice(0,11));
				/*self.set('scopeData', self.get('scopeData').responseJSON);*/
				console.log(self.get('scopeData'));
			});

			
			

		},
		/* Handles updating the data bound to the dropdown area. When a graph
		   is selected (ie. image clicked), the dataModel for the graph type
		   is assigned to the data for the dropdown, and the bindings should
		   make it update automagically in the view. 

		   This also takes the columns from the selected data set, and uses
		   them to populate the dropdown boxes */
		showGraphDataModel: function() {
			console.log(this);
			console.log('show graph data model called');
			if(!this.get('showDataModel')) {
				this.toggleProperty('showDataModel');
			}
			this.set('scopeGraph',['Group','Measure']);

		},

		addGraph: function() {
			console.log('call modal graph builder');
		}
	}
});
