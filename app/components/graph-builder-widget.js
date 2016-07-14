import Ember from 'ember';

export default Ember.Component.extend({
	
	showDataSourcePreview: false,
	showVizSelection: false,
	showDataModel: false,
	renderGraph: false,
	
	// scopeComponent: 'graphs/chartjs-bar',	
	scopeData: [], // placeholder for the data populated by getData action
	scopeGraphID: undefined,
	scopeDataModel: {}, // holds the current selected graph metadata
	scopeComponent: undefined,
	

	actions: {

		toggleDataSourcePreview: function() { 
			this.toggleProperty('showDataSourcePreview');
		},		
		
		getData: function(source) {
			var self = this;
			var url = source.url;
			this.toggleProperty('showDataSourcePreview');
			// this.set('dataSourceLabel')
			// this.toggleProperty('showVizSelection');

			// this is working... updating scopeData property in callback
			Ember.$.getJSON(url, function(data) { 					
				self.set('scopeData', data.splice(0,25));
				self.get('scopeData').map(function(d) { 
					delete d.name;
					delete d.spouse;

				});
				
			});

		},
		/* Handles updating the data bound to the dropdown area. When a graph
		   is selected (ie. image clicked), the dataModel for the graph type
		   is assigned to the data for the dropdown, and the bindings should
		   make it update automagically in the view. 

		   This also takes the columns from the selected data set, and uses
		   them to populate the dropdown boxes */
		showGraphDataModel: function(graph) {			
			if(!this.get('showDataModel')) {				
				this.set('showDataModel',true);
			}			

			/* graph is the data model of the selected graph, label is what we want in dropdown */
			this.set('scopeGraphID', graph.id);
			this.set('scopeDataModel', graph.dataModel);
			this.set('scopeComponent', graph.component);
			
		},

		tryGraphRender: function(dataModelField, selectedField) {
			console.log('tryGraphRender invoked');
			console.log(this);
			// called when a user defines or changes a graph input field

			// first figure out if there's an existing graph, if so, remove it
			if(this.get('renderGraph')) {
				// should destroy existing component... calls willDestroyElement
				// this.set('scopeComponent',undefined);	
				// console.log('renderGraph now being set to false');
				this.toggleProperty('renderGraph');
				// this.set('scopeComponent',undefined);
				

				

			}

			// update the data model with assignments
			Ember.set(this.get('scopeDataModel')
				 .findBy('name',dataModelField), 'field.assigned',selectedField);

			var requiredFields = this.get('scopeDataModel')
			               .filter(function(item) { return item.required === true})
			               .map(function(d) { 
			               		return d.field.assigned
			               	});

			if(requiredFields.indexOf("") === -1) {			
				console.log('renderGraph now being set to true');
				// this.set('renderGraph',true);
				var self = this;
				setTimeout(function() { self.toggleProperty('renderGraph'); }, 250)
				// this.set('scopeComponent','graphs/chartjs-bar');	
				// this.set('scopeComponent', this.get('graphOptions')[this.scopeGraphID].component);
				// this.actions.showGraphDataModel(this.get('graphOptions')[this.scopeGraphID]);
			}

			// now figure out if we have all the required fields defined

		},

		saveGraph: function() {
			console.log('current graph and target li');
			console.log(this.get('graphTarget'));


			// place copy of graph into li
			// current-builder-widget-graph
			/*Ember.$.('current-builder-widget-graph');*/
			// Ember.$(this.get('graphTarget')).append(Ember.$('#current-builder-widget-graph').clone());


		}

		
		
	}
});
