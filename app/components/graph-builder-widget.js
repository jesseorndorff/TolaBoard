import Ember from 'ember';

export default Ember.Component.extend({
	
	showDataSourcePreview: false,
	showVizSelection: false,
	showDataModel: false,
	renderGraph: false,
	fieldIndex: 0,
	filters: [],

	field: Ember.computed('fieldIndex', function() {
		return this.get('scopeData')[this.get('fieldIndex')]
	}),
	
	// scopeComponent: 'graphs/chartjs-bar',	
	scopeData: [], // placeholder for the data populated by getData action
	scopeGraphID: undefined,
	scopeDataModel: Ember.Object.create(), // holds the current selected graph metadata
	scopeComponent: undefined,

	disableSave: true,
	tolaGraph: {name: 'tolaGraph from tolagraph.js!!!'},


	// wanted to log these hooks running to understand Ember better
	// Ember calls these methods
	didInsertElement: function() {

		// console.log('gbw didInsertElement invoked on gbw',this);
		/*console.log('tbi',this.get('tbItem'));
		console.log('aw',this.get('activeWidget'));
		console.log('aEl',this.get('activeElement'));
		console.log('aIn',this.get('activeIndex'));*/
		var tbItemConfig = this.get('activeTBItemConfig');
		console.log('gbw this ',this);
		// console.log('data sources',this.get('dataSources'));
		// console.log('source id',this.get('activeTBItemConfig').graph.dataSourceId);



		/* if there's an activeTBItemConfig, then there's a selected data source */

		// step 1, show selected data
		if(tbItemConfig) {

			var url = this.get('dataSources')[tbItemConfig.graph.dataSourceId].url;
			this.toggleProperty('showDataSourcePreview');
			// this.set('dataSourceLabel')
			// this.toggleProperty('showVizSelection');

			// this is working... updating scopeData property in callback
			Ember.$.getJSON(url, function(data) { 					
				self.set('scopeData', data.splice(0,200));
				self.get('scopeData').map(function(d) { 
					delete d.name;
					delete d.spouse;

				});
				
			});
		}

	},
	didRender: function() {
		// console.log('gbw didRender invoked');
	},
	
	
	actions: {

		toggleDataSourcePreview: function() { 
			this.set('showDataSourcePreview',true);

			var tolagraphConfig = {
				// dataSource: this.
			};

			var tolagraph = Tolagraph.create()

		},		
		
		getData: function(url) {
			// console.log('getData called with: ',source);
			var self = this;
			// var url = source.get('url');
			this.set('showDataSourcePreview',true);
			// this.set('dataSourceLabel')
			// this.toggleProperty('showVizSelection');

			// this is working... updating scopeData property in callback
			Ember.$.getJSON(url, function(data) { 					
				self.set('scopeData', data.splice(0,200));
				self.get('scopeData').map(function(d) { 
					delete d.name;
					delete d.spouse;

				});
				
			});

		},

		/* manipulates array of filters */
		addFilter: function() {
			// get max id of current filterArr, add 1, and that's the new id
			var filterArr = this.get('filters'),
			    newID;
			
			if (filterArr.length === 0) {
				newID = 0;
			}
			else {
				newID = 1+Math.max.apply(null, filterArr.map(function(d) { return d.id}));
			}
			filterArr.pushObject({id:newID});
			
		},
		/* delete filter of matching id */			
		deleteFilter: function(id) {			
			var filterArr = this.get('filters');
			var index = filterArr.map(function(d) { return d.id}).indexOf(id); // index of located id
			filterArr.removeObject(filterArr[index]);			
		},
		updateFilter: function(id, params) {
			console.log('update filter!!! ', id);
		},
		/* Handles updating the data bound to the dropdown area. When a graph
		   is selected (ie. image clicked), the dataModel for the graph type
		   is assigned to the data for the dropdown, and the bindings should
		   make it update automagically in the view. 

		   This also takes the columns from the selected data set, and uses
		   them to populate the dropdown boxes */
		showGraphDataModel: function(graph) {			
			// console.log('graph',graph);
			if(!this.get('showDataModel')) {				
				this.set('showDataModel',true);
			}			

			/* graph is the data model of the selected graph, label is what we want in dropdown */
			this.set('scopeGraphID', graph.id);
			this.set('scopeDataModel', graph.get('dataModel'));
			this.set('scopeComponent', graph.get('component'));
			
		},

		/* this is really tricky
		The way this should work is that we have a dataModel which is 
		bound to the Ember view for the graph. If the dataModel gets 
		updated with assigned fields for inputs, the graph should render
		via the render-tolaboard-item component. 

		For this to work, the bound dataModel needs to be an Ember object*/
		tryGraphRender: function(selectedField) {

			// kind of hacky, but gets the data model field name
			var dataModelFieldName = event.target.name;
			console.log('scopeGraphID',this.get('scopeGraphID'));
			console.log('scopeDataModel',this.get('scopeDataModel'));
			console.log('scopeComponent',this.get('scopeComponent'));
			
			
			// console.log(dataModelFieldName,': ',selectedField);
			
			// find index of selectedField in dataModel

			// console.log(this.get('scopeDataModel'));
			// this.set('scopeDataModel','assigned',selectedField);
			// called when a user defines or changes a graph input field

			// first figure out if there's an existing graph, if so, remove it
			if(this.get('renderGraph')) {
				// should destroy existing component... calls willDestroyElement
				// this.set('scopeComponent',undefined);	
				// console.log('renderGraph now being set to false');
				/*this.set('renderGraph',true);
				this.set('showDataFilters',true);*/

				

				
				
			}

			// update the data model with assignments
			Ember.set(this.get('scopeDataModel')
				 .findBy('name',dataModelFieldName), 'assigned',selectedField);

			var requiredFields = this.get('scopeDataModel')
			               .filter(function(item) { return item.required === true})
			               .map(function(d) { 
			               		return d.assigned
			               	});

			if(requiredFields.indexOf("") === -1) {			
				// console.log('renderGraph now being set to true');
				// this.set('renderGraph',true);
				var self = this;
				setTimeout(function() { 
					self.set('renderGraph',true); 
					self.set('showDataFilters',true);
				}, 250);
				this.toggleProperty('disableSave');
				// this.set('scopeComponent','graphs/chartjs-bar');	
				// this.set('scopeComponent', this.get('graphOptions')[this.scopeGraphID].component);
				// this.actions.showGraphDataModel(this.get('graphOptions')[this.scopeGraphID]);
			}

			// now figure out if we have all the required fields defined

		},

		clearGraphBuilder: function() {

			Ember.$('#data-source-select option:eq(0)').prop('selected',true);
			this.set('showDataSourcePreview', false);
			this.set('showVizSelection', false);
			this.set('showDataModel', false);
			this.set('renderGraph', false);		
			this.set('showDataFilters',false);
			this.set('filters', []);
			this.set('scopeData', []);
			this.set('scopeGraphID', undefined);
			this.set('scopeDataModel', {});
			this.set('scopeComponent', undefined);
			this.set('disableSave', true);

			// this.destroyElement();
		},

		didDestroyElement: function() { 
			// console.log('did destroy gbw');
			// this.sendAction('removeItem', this.get('index'));
			/* Once element is destroyed, destroy underlying object
			   if this isn't done, didRender keeps running on it.
			   	Might also create memory leaks, but not certain.*/
			// this.destroy();
		},
		
		updateBoardItem: function() {
			// console.log('attempt to send new updateBoardItem');
			this.sendAction('updateSaveBoardItem', this.get('tolaGraph'));
			// this.sendAction('updateBoardItem');
		}		
		
	}, // end actions

	buildTolagraph: function() {
		// take existing definitions, and create a tolagraph instance

		var config = {

			dataSource: this.scopeData,
			component: this.scopeComponent,


		};
	}

});
