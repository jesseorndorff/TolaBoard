import Ember from 'ember';

export default Ember.Component.extend({

	// itemMutable: true,
	/*scopeGraph: Ember.computed(function() {
		console.log('cp this comp',this.get('tbItemConfig').graph.component);
		return this.get('tbItemConfig').graph.component;
	}),*/

	/*function() {
		console.log('this inside comp prop',this);
		return this.get('tbItemConfig').graph.component
	},*/
	showGraphBuilder: false,


	didInsertElement:  function() {

		// console.log('render item index:',this.get('index'));
	
		/* Same issue here as with tolaboard-item component. Using the higher level API
		   doesn't work for ember because it appends the li to the ".gridster ul" selector.
		   Need to append to ember view piece by piece like in tb-item
	
		   */
		// console.log('render component this',this);
		var el = Ember.$(this.get('element'));

		var grid = Ember.$('.gridster ul');

		// what if I just add new widget at 1,1 with 1,1 size?
		grid.gridster({
		        widget_margins: [5, 5],
		        widget_base_dimensions: [140, 140],
		        resize: { enabled: true,
		        		  stop: function(e,ui,$widget) {
		        		  	console.log('gridster resize end detected');
		        		  }}
		});
				
		// API object for dynamic
		grid = grid.gridster().data('gridster');

		// if itemMutable is false...
		if(!this.get('itemMutable')) {
			
			// disable grid dragging, resizing
			grid.disable();
			grid.disable_resize();
			Ember.$('.gridster ul').gridster({resize: {enabled: false}});
			Ember.$('.gridster li').css('cursor','pointer');
			
		}

		// get the .hbs template for this instance of the component, set it to thisView
		var thisView = this.get('element').childNodes[0];
		/* above line doesn't work because no li was added during the view
		   we could assume an li needs to be added, then follow through as before
		   i mean, if edit mode is used, we need that same view with the edit/delete buttons*/
		// var thisView = this.get('element');
		
		/* NEW APPROACH USING LOW-LEVEL GRIDSTER API'S */

		// .empty_cells(col, row, size_x, size_y);
		// grid.empty_cells(1, 1, 2, 2);
		var widget = this.get('tbItemConfig').widget;

		// add attrs that will activate css so grid is positioned and sized
		Ember.$(thisView).attr({
                'data-col': widget['col'],
                'data-row': widget['row'],
                'data-sizex' : widget['size_x'],
                'data-sizey' : widget['size_y']
            }).addClass('gs-w');

		// add to $widgets object
		// console.log('grid ', grid);
		
		grid.$widgets = grid.$widgets.add(thisView);
		console.log('grid widgets',grid.$widgets);

		// register
		grid.register_widget($(thisView));

		// remaining bits
		grid.add_faux_rows(2);
		grid.set_dom_grid_width();
        grid.set_dom_grid_height();
        grid.drag_api.set_limits(grid.cols * grid.min_widget_width);

        // now define scopeGraph
        /* This is not advised, and throws a warning in the error console. Ember wants
        	you to use a computed property within the component level object. However, 
        	this doesn't seem to work well since we need the component's view to be 
        	rendered entirely before assign a value to the scopeGraph. Otherwise, 
        	the component graph for this particular renders using 100% window width
        	instead of the width of the widget. */
        // this.set('scopeGraph', this.get('tbItemConfig').graph.component);
		
	},

	/* willDestroyElement called by the ember run-time when the component is about to
	   be destroyed. In this time, we need to clean up the gridster data model, and 
	   remove the element from there. Otherwise, we'll have data but no corresponding
	   DOM element, and the serialization will be off. */
	willDestroyElement: function() { 

		// get the element
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
		     	// add any logic needed after widget removed here if applicable
		      });

		// we also need to remove the item from our items array maintained
		// in tolaboard-designer
		this.sendAction('removeTBItem',this.get('index'));

	},
	
	/* didDestroyElement destroys the underlying Ember object representing the component.
	   This is the final step. If this isn't done, didRender keeps running on it.
	    Might also create memory leaks, but not certain.*/
	didDestroyElement: function() { 
		// this.sendAction('removeItem', this.get('index'));
		/* Once element is destroyed, destroy underlying object
		   if this isn't done, didRender keeps running on it.
		   	Might also create memory leaks, but not certain.*/
		this.destroy();
	},

	actions: {
		
		activateGraphBuilder: function() {
			/*console.log('tbItem:',this.get('tbItemConfig'));
			console.log('widget',this.get('tbItemConfig').widget);
			console.log('thisView',this.get('element').childNodes[0]);*/

			// this.sendAction('activateGraphBuilder');
			this.set('showGraphBuilder',true);

			this.sendAction('setActiveTBItemConfig',this.get('tbItemConfig'));
			this.sendAction('setActiveElement',this.get('element').childNodes[0]);
			this.sendAction('setActiveIndex',this.get('index'));
			// this.sendAction('setActiveWidget','fooWidget');
		},
		/* runGraphBuilderWidget action is called by the edit button, if applicable. 
		   This is currently only the case for the designer component. */
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
			console.log(this);
			/* deleteWidget - as with runGraphBuilderWidget, only needed in edit mode when
			   the trashcan button is available. This action destroys the component */
			this.destroyElement();		
			

		}
	}
});
