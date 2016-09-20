import Ember from 'ember';

/* each type of component or graph which can be rendered in a gridster widget... making up a tolaboard,
   will have its own ember component. This is where the functions for how to draw this particular graph
   will live, and all it needs is the info to get the data for this viz. The element is autoamtic because
   we just use the ember view given along with the .viz class to form a combined css selector

   to render a bar graph in chart js, we need:
   1. configuration containing data and labels and colors
   2. dom element, which should be this.get('element') canvas*/
export default Ember.Component.extend({

	self: this,

	dataAgg: Ember.inject.service('data-aggregator'),

	chartConfig: Ember.Object.create(),


	didInsertElement: function() {

		console.log('chartjs bar component ',this);

		var tolaGraphConfig = {
			element: '#scope-viz',
			// data: this.get('graph').config.data.data,
		    dataModel: this.get('scopeDataModel')
		};

		/*tolaGraphConfig.metadata = {
		    	labelList: this.get('dataAgg').oneDimensionGroupKeys(scopeData, [], scopeDataModel[0].field.assigned),
		    	metricList: this.get('dataAgg').oneDimensionSumValues(scopeData, [], scopeDataModel[0].field.assigned, scopeDataModel[1].field.assigned)
		    };*/

		
		tolaGraphConfig.chartConfig = {
		    	type: 'bar',
		    	data: {
		        	labels: ['A', 'B', 'C'],
		        	datasets: [{	            	
		            	data: [34,23, 78],
		            	backgroundColor: '#00afaa'
			        }]
			    },
			    options: {}
			}; // chartConfig

		/*tolagraphConfig.metadata.metricList = tolagraphConfig.metadata.metricList
		  									  .map(function(d) { return d.value; });*/
		
		// ok, use our master config and create the tolagraph
		// var barGraph = Tolagraph.create(tolaGraphConfig);
		/*barGraph.render = function() {
			new Chart(this.element, tolaGraphConfig);
		};*/


		// data setup
		var scopeData = this.get('scopeData'),
		    scopeDataModel = this.get('scopeDataModel'),
		    graphConfig = this.get('graphConfig');
		

		/*var labelList = this.get('dataAgg')
		                .oneDimensionGroupKeys(scopeData, [], scopeDataModel[0].field.assigned);
		
		var metricList = this.get('dataAgg')
		                 .oneDimensionSumValues(scopeData, [], 
		                 						scopeDataModel[0].field.assigned, 
		                 						scopeDataModel[1].field.assigned);

		metricList = metricList.map(function(d) { return d.value; });*/
		// console.log('bar this', this);

		/*console.log('labelList ',labelList);
		console.log('metricList', metricList);*/

		// test to render a static bar graph

		// var chartElem = Ember.$('#current-builder-widget-graph');

		/*var config = {
	    	type: 'bar',
	    	data: {
	        	labels: labelList,
	        	datasets: [{	            	
	            	data: metricList,
	            	backgroundColor: '#00afaa'
		        }]
		    },
		    options: {}
		};*/

		var fooConfig = {
	    	type: 'bar',
	    	data: {
	        	labels: ['A','X','C'],
	        	datasets: [{	            	
	            	data: [32,45,67],
	            	backgroundColor: '#00afaa'
		        }]
		    },
		    options: {}
		};

		// var graph = new Chart(this.get('element'), fooConfig);


		var ctx = this.$('canvas');
		
		ctx.resize(function() {
			'resize detected';
		});

		var testChart = new Chart(ctx, fooConfig);
	},

	willDestroyElement: function() {
		console.log('willDestroyElement on bar chart component called');
	},

	
	/*didRender: function() { console.log('chart didRender')},
	didReceiveAttrs: function() {console.log('chart didReceiveAttrs')},*/
	
});
