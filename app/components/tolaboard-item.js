import Ember from 'ember';

export default Ember.Component.extend({

	

	/* fires when component comes into existance in the DOM */	
	init: function() { 
		this._super(...arguments);
		console.log('init called');

	},
	didInsertElement: function() {

		/*console.log('item this: ',this);
		console.log('item this', this.get('index'));*/
		// this.('graphTarget') = this.get('element');		
		
		// get the gridster object and max/min col and row
		var grid = Ember.$('.gridster ul');

		// what if I just add new widget at 1,1 with 1,1 size?
		grid.gridster({
		        widget_margins: [5, 5],
		        widget_base_dimensions: [140, 140],
		        resize: { enabled: true}
		});
				
		// API object for dynamic
		grid = grid.gridster().data('gridster');

		// get the .hbs template for this instance of the component, set it to thisView
		var thisView = this.get('element').childNodes[0];
		this.set('graphTarget', thisView);
		// remove it so we can add it back via gridster add_widget()
		this.get('element').childNodes[0].remove();
		var newlyAddedLI = grid.add_widget(thisView, 2, 2, 1, 1); // returns generated <li>
		

	},

	didRender: function() { console.log('didRender invoked'); },
	willDestroyElement: function() { console.log('willDestroyElement'); },

	actions: {
		testFromView: function() { 
			console.log('i am from tolaboard item view and element is'); 
			var target = this.get('graphTarget');
			console.log(target);
			// $(target).append('<svg><circle cy="40" cx="40" r="10"</circle></svg>');

		},
		deleteWidget: function() {
			// get the parent li for this button			
			console.log('delete me');			
			console.log(this);
			
			var parentLI = this.get('graphTarget');
			
			/* gridster takes about half a second to delete the widget
			   and it's annoying... so we'll hide it right away while
			   waiting for remove_widget to complete */
			Ember.$(parentLI).css('visibility','hidden');

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
