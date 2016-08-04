import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function() {

		console.log('test graph el',this);

		var config = this.get('tbItemConfig').graph.config;

		/*var config = {
	    	type: 'bar',
	    	data: {
	        	labels: ['A', 'B', 'C'],
	        	datasets: [{	            	
	            	data: [32,45,67],
	            	backgroundColor: '#00afaa'
		        }]
		    },
		    options: {}
		};*/

		var ctx = this.$('canvas');
		ctx.resize(function() {
			'resize detected';
		});

		var testChart = new Chart(ctx, config);
	}


	
});
