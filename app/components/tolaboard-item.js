import Ember from 'ember';

export default Ember.Component.extend({

	/* fires when component comes into existance in the DOM */	
	init: function() { 
		this._super(...arguments);
		console.log('init called');
	},
	didInsertElement: function() {
		console.log('item this', this.get('index'));		
		
		// get the gridster object and max/min col and row
		var grid = Ember.$('.gridster ul');

		// what if I just add new widget at 1,1 with 1,1 size?
		grid.gridster({
		        widget_margins: [5, 5],
		        widget_base_dimensions: [140, 140],
		        resize: { enabled: true}
		});
		
		/* This next section is kinda weird... the gridster API wants the html so it can
		   pass it into the add_widget method... but this is view code
		   and should be in the Ember template. The API appends various data
		   tags to the appended DOM nodes, and those are used by the css
		   to size and place the widgets. There are also, likely, functions bound
		   to the drag events. So, we really need to add the view code via Gridster API

		   Note: The data-target attr for the first button activates the 
		   graph-builder-widget component which lives in the tolaboard-layout...
		   so one instance of the builder regardless of gridster widgets
		*/
		var buttonHTML = '<div class="widget-ui btn-group">' +
						 '<button data-toggle="modal" data-target="#myModal" class="btn btn-xs"><span class="fa fa-edit"></span></button>' +
		                 '<button class="btn btn-xs delete-button"><span class="fa fa-trash"></span></button>' +
		                 '</div>',
		widgetLI = '<li>' + buttonHTML + '</li>';

		// API object for dynamic
		grid = grid.gridster().data('gridster');
		grid.add_widget(widgetLI, 2, 2, 1, 1);		
		
		/* We're defining the delete action in this module, but since the 
		   gridster api isn't aware of Ember actions. So, we're cheating
		   and using jQuery... but at least the action is defined here :)
		*/
		Ember.$('.delete-button').on('click', this.actions.deleteWidget);

		/* end weird work-around for gridster vs Ember issue */
	},

	didRender: function() { console.log('didRender invoked'); },
	willDestroyElement: function() { console.log('willDestroyElement'); },

	actions: {
		deleteWidget: function() {
			// get the parent li for this button			
			var parentLI = Ember.$(this).parent().parent();
			
			/* gridster takes about half a second to delete the widget
			   and it's annoying... so we'll hide it right away while
			   waiting for remove_widget to complete */
			parentLI.css('visibility','hidden');

			/* USE THE API!  Don't remove with just jQuery 
			   It needs removed from data object too. If you have any
			   questions if things are going right... check the following
			   in the console: 
			   $('.gridster ul').gridster().data('gridster').$widgets
			   It's the data model for the grid widgets
			   */
			Ember.$('.gridster ul').gridster()
			     .data('gridster')
			     .remove_widget(parentLI, function() {
			     	// add any logic needed after widget removed here

			     	/* We need to cleanup some things...
					   1. parent Ember object.childViews needs to have this element removed
					   2. tolaboardItems array as well
			     	*/
			     	
			     });
			

		}
	}
});
