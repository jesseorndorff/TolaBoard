import Ember from 'ember';

export default Ember.Component.extend({

	self: this,

	dataAgg: Ember.inject.service('data-aggregator'),
	colorService: Ember.inject.service('color-palette'),

	dataModel: [],

	didInsertElement: function() {

		console.log('pie graph component this',this);

		// persisted config contains metadata for defining data
		var config = this.get('tbItemConfig').graph.config;		

		/* data setup...
			1. obtain data source
			2. use dataModel to aggregate on assigned fields
			3. build labels using aggregated data
			4. build data using aggregated data
			5. update tbItemConfig.graph.config
		*/
		console.log('dataSources in pie?',this,this.get('dataSources'));
		
		/*var scopeData = this.get('scopeData'),
		    scopeDataModel = this.get('scopeDataModel'),
		    graphConfig = this.get('graphConfig');*/

		

		/*var labelList = this.get('dataAgg')
		                .oneDimensionGroupKeys(scopeData, [], scopeDataModel[0].field.assigned);
		
		var metricList = this.get('dataAgg')
		                 .oneDimensionSumValues(scopeData, [], 
		                 						scopeDataModel[0].field.assigned, 
		                 						scopeDataModel[1].field.assigned);

		metricList = metricList.map(function(d) { return d.value; })*/

		/*var colorList = this.get('colorService')
		                .classicPalette;*/


		

		// grab the canvas element, which is basically the ember view canvas
		var ctx = this.$('canvas');
		
		// jquery resize to handle responsiveness on gridster resizing
		ctx.resize(function() {
			'resize detected';
		});

		// render pie chart with chart.js call to Chart()
		var pieChart = new Chart(ctx, config);
	},

	willDestroyElement: function() {
		console.log('willDestroyElement called');
	}
});
