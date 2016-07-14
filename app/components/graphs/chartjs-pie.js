import Ember from 'ember';

export default Ember.Component.extend({

	self: this,

	dataAgg: Ember.inject.service('data-aggregator'),
	colorService: Ember.inject.service('color-palette'),

	didInsertElement: function() {

		// data setup
		var scopeData = this.get('scopeData'),
		    scopeDataModel = this.get('scopeDataModel'),
		    graphConfig = this.get('graphConfig');

		/*console.log('3 inputs: ');
		console.log(scopeData);
		console.log(scopeDataModel);
		console.log(graphConfig);
		console.log('chart this ', this);*/

		var labelList = this.get('dataAgg')
		                .oneDimensionGroupKeys(scopeData, [], scopeDataModel[0].field.assigned);
		
		var metricList = this.get('dataAgg')
		                 .oneDimensionSumValues(scopeData, [], 
		                 						scopeDataModel[0].field.assigned, 
		                 						scopeDataModel[1].field.assigned);

		metricList = metricList.map(function(d) { return d.value; })

		console.log('labelList ',labelList);
		console.log('metricList', metricList);

		var colorList = this.get('colorService')
		                .classicPalette;

		// test to render a static bar graph

		var chartElem = Ember.$('#pie-graph');

		var config = {
	    	type: 'pie',
	    	data: {
	        	labels: labelList,
	        	datasets: [{	            	
	            	data: metricList,
	            	backgroundColor: colorList
		        }]
		    },
		    options: {}
		};

		var graph = new Chart(chartElem, config);
	},

	willDestroyElement: function() {
		console.log('willDestroyElement called');
	}
});
