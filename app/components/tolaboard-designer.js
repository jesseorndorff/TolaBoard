import Ember from 'ember';

export default Ember.Component.extend({

	showCreate: false,
	showEdit: false,

	actions: {
		addWidget: function() {
			console.log('get max pos and plus 1');

			// get the gridster object and max/min col and row
			var grid = Ember.$('.gridster ul');

			// what if I just add new widget at 1,1 with 1,1 size?
			grid.gridster({
			        widget_margins: [10, 10],
			        widget_base_dimensions: [140, 140],
			        resize: { enabled: true}
			});

			// API object for dynamic
			grid = grid.gridster().data('gridster');
			grid.add_widget('<li></li>', 1, 1, 1, 1);
				
			



		}
	}
});
