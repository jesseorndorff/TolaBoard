import Ember from 'ember';

export default Ember.Service.extend({

	
	/* clients of this service will pass data, filter, grouping and sum
	   fields via arrays. Then this service returns a js object with
	   results aggregated and ready for use */
	aggregator: function(data, filterArr, groupByArr, sumArr) {
		
		

	},

	oneDimensionGroupKeys: function(data, filterArr, groupField) {
		return d3.set(data.map(function(d) { 
			return d[groupField]; 
		})).values();
	},

	oneDimensionSumValues: function(data, filterArr, groupName, sumName) {

		var nest = d3.nest()
		           .key(function(d) { return d[groupName]})
		           .rollup(function(rows) {
		           		return d3.sum(rows, function(d) { return d[sumName];})
		           })
		           .entries(data);

		return nest;


	}
});
