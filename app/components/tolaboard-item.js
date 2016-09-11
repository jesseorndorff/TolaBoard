import Ember from 'ember';

export default Ember.Component.extend({

	

	/* fires when component comes into existance in the DOM */	
	/*init: function() { 
		this._super(...arguments);
		console.log('init called');
	},*/
	didInsertElement: function() {

		/*console.log('tb-item didInsertElement invoked');
		console.log('index of item is ', this.get('index'));*/
		/* Gridster meets Ember
		Kinda tricky because gridster likes adding the html, for 3 reasons..
		1. adds data attrs so css knows how to size grids
		2. adds events to make html elements draggable, resizeable
		3. maintains a data model for the grid in a js object

		In typical ember.js, the view template is added natively by the 
		simple inclusion of the component helper in the view. Any logic is
		handled by the corresponding js file.

		So we have a view for a our li and all the actions, but no gridster
		logic tied to it... so it doesn't work.

		Ideally, only data... add_to_gridmap ?

		*/
		
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
		
		/* NEW APPROACH USING LOW-LEVEL GRIDSTER API'S */

		// .empty_cells(col, row, size_x, size_y);
		grid.empty_cells(1, 1, 2, 2);

		// add attrs that will activate css so grid is positioned and sized
		Ember.$(thisView).attr({
                'data-col': 1,
                'data-row': 1,
                'data-sizex' : 2,
                'data-sizey' : 2
            }).addClass('gs-w');

		// add to $widgets object
		// console.log('grid ', grid);
		grid.$widgets = grid.$widgets.add(thisView);

		// register
		grid.register_widget($(thisView));

		// remaining bits
		grid.add_faux_rows(2);
		grid.set_dom_grid_width();
        grid.set_dom_grid_height();
        grid.drag_api.set_limits(grid.cols * grid.min_widget_width);        

	},

	didRender: function() { 
		// console.log('tb-item didRender invoked'); 
		
	},
	willDestroyElement: function() { 

		// console.log('willDestroyElement invoked');
		var removeEl = this.get('element').childNodes;
		/* USE THE API!  Don't remove with just jQuery 
			   It needs removed from data object too. If you have any
			   questions if things are going right... check the following
			   in the console: 
			   $('.gridster ul').gridster().data('gridster').$widgets
			   It's the data model for the grid widgets
			   */
		Ember.$('.gridster ul').gridster()
		     .data('gridster')
		     .remove_widget(removeEl, function() {
		     	// add any logic needed after widget removed here
		      });
	},
	
	didDestroyElement: function() { 
		this.sendAction('removeItem', this.get('index'));
		/* Once element is destroyed, destroy underlying object
		   if this isn't done, didRender keeps running on it.
		   	Might also create memory leaks, but not certain.*/
		this.destroy();
	},

	actions: {
		runGraphBuilderWidget: function() { 
			/* the modal will actually display the builder, but anything
			   needed to run at this stage in tb-item goes here */
			this.sendAction('setActiveItem', this.get('elementId'));
		},
		/*appendContent: function(tolagraph) {
			// called via sendAction in graph-builder-widget component
			console.log('appendContent', tolagraph);
		},*/
		deleteWidget: function() {
			/* start the process of removing the component 
			   this will call willDestroyElement and then
			   didDestroyElement */
			// console.log('calling destroyElement');
			// console.log(this);
			this.destroyElement();
			
			// var parentLI = this.get('element').childNodes[0];
			
			/* gridster takes about half a second to delete the widget
			   and it's annoying... so we'll hide it right away while
			   waiting for remove_widget to complete */
			// Ember.$(parentLI).css('visibility','hidden');

			
			

		}
	}
});
