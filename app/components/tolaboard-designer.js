import Ember from 'ember';

export default Ember.Component.extend({

	/* This is the component control/state logic for 
	   tolaboard-designer.hbs template */
	showCreate: false,
	showEdit: false,
	showDesigner: false,
	showDataSourcePreview: false,
	showVizSelection: false,
	
	

	actions: {
		toggleNewBoard: function() { 
			this.toggleProperty('showDesigner');
		},
		toggleDataSourcePreview: function() { 
			this.toggleProperty('showDataSourcePreview');

		},

		addWidget: function() {
			console.log('get max pos and plus 1');

			// get the gridster object and max/min col and row
			var grid = Ember.$('.gridster ul');

			// what if I just add new widget at 1,1 with 1,1 size?
			grid.gridster({
			        widget_margins: [5, 5],
			        widget_base_dimensions: [140, 140],
			        /*autogenerate_stylesheet: false,*/

			        resize: { enabled: true}
			});

			/* Temporary hack till I figure out calling child views */
			var buttonHTML = '<div class="widget-ui btn-group">' +
							 '<button data-toggle="modal" data-target="#myModal" class="btn btn-xs btn-secondary graph-edit"><span class="fa fa-edit"></span></button>' +
			                 '<button onclick="deleteWidget(this)" class="btn btn-xs btn-secondary"><span class="fa fa-trash"></span></button>' +
			                 '</div><script> function deleteWidget(el) { $(el).parent().parent().css(\'display\',\'none\')}</script>',
			    widgetLI = '<li>' + buttonHTML + '</li>';

			
			// API object for dynamic
			grid = grid.gridster().data('gridster');
			grid.add_widget(widgetLI, 2, 2, 1, 1);

			// hack
			/*Ember.$('.graph-edit').on('click', function() {
				console.log('you clicked me');
			})*/
				
			



		},		
		deleteWidget: function() {
			console.log('delete widget');
		},
		getData: function() {
			this.toggleProperty('showDataSourcePreview');
			this.toggleProperty('showVizSelection');
		},

		addGraph: function() {
			console.log('call modal graph builder');
		}
	}
});

/*export default Ember.ContainerView.extend({


});*/
