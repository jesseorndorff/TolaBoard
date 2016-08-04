import Ember from 'ember';

export default Ember.Component.extend({
	dashboardA: { layout: [{col:1,row:1,size_x:1,size_y:1},{col:4,row:1,size_x:2,size_y:2},{col:2,row:3,size_x:4,size_y:2},{col:1,row:2,size_x:1,size_y:1},{col:2,row:1,size_x:2,size_y:2}],
				  graphs: ['public/demo/graphs/dial1.png']	},		   
	graphsA: [{link: 'test'}, {link: 'test'}, {link: 'test'}, {link: 'test'}],
	testVal: 'foo',	
	

	didInsertElement:  function() {
			// console.log('draw the grid');

			Ember.$(".gridster ul").gridster({
			        widget_margins: [5, 5],
			        widget_base_dimensions: [140, 140],
			        resize: { enabled: true}
			});	

			// API object for dynamic
			var gridDynamic = Ember.$("#dashboard ul").gridster().data('gridster');
			this.dashboardA.layout.map(function(d) {
				gridDynamic.add_widget('<li>&nbsp;&nbsp; test</li>', d['size_x'], d['size_y'], d['col'], d['row']);
				
			});
		}
	
	

});
