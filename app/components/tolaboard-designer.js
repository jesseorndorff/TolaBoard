import Ember from 'ember';

var TBoard = Ember.Object.extend({
	title: 'Some Generic Title',
	dashboard: []
});

export default Ember.Component.extend({	
	showDesigner: false,
	showGridLayout: false,

	currentDashboard: function() {
		return this.get('model').testTB;
	},
	/* array of tolaboard-items (ie. gridster widgets) */
	/*tolaboardItems: Ember.computed(function() {
		return this.get('model').tolaboard.responseJSON.dashboard;
	}),*/

	/* fires when tolaboard-designer.hbs has loaded */
	didInsertElement: function() {	
		console.log('tb-designer object',this);	
		// see if model contains valid tolaboard
		// MODEL HASN'T RETURNED BEFORE VIEW RENDERED AND THIS METHOD RUN
		// WE NEED MODEL TO BE AVAILABLE FIRST		
		

		// console.log('tolaboard via model',this.get('tolaboard'));
		

		/*var foo = TBoard.create();
		console.log('new tboard',foo);*/
	},

	/*didInsertElement: function() {
		console.log('model passed to layout component',this.get('model'));

		// new tolaboard
		var tBoard = Tolaboard.create();
		console.log('new tBoard',tBoard);

	},*/

	willDestroyElement: function() {
		// console.log('will destroy in layout called');
	},

	/* Next section (prior to actions) contains methods for persisting tolaboard 

	   saveTolaBoard - called from action updateSaveTolaBoard
	   getSerializedWidgets - get JSON serialization of gridster 
	   getSerializedGraphs - ditto but for tolagraphs
	*/
	saveTolaBoard: function() {
		console.log('serialize and persist tolaboard');
		console.log(this.getSerializedWidgets());
		},

	getSerializedWidgets: function() {
		return $('.gridster ul').gridster().data('gridster').serialize();
	},

	getSerializedGraphs: function() {
		// iterate $tolagraphs on gridster object and return object array
	},

	getJSONString: function(obj) {
		// return json-ized string of obj
	},
	
	actions: {
		createNewBoard: function() { 
			// check state to see if we're already in current or new board

			// if nothing, create new board object, assign to model, ie currBoard
			var currBoard = TBoard.create();
			this.set('currBoard',currBoard);

			// show board design window
			this.set('showDesigner',true);

			// if new or existing exists, prompt, save, wipe out and call createNewBoard
		},

		addItem: function() {			
			// push new dashboard item into model.items
			var curItems = this.get('model').items;
			console.log(curItems);
		},
		removeItem: function(index) {			
			// push item into tolaboardItems array			
			// this.tolaboardItems.pushObject(newID);			
			this.tolaboardItems.removeObject(index);
			// console.log('removeItem called by tb-item via sendAction');
		},
		setActiveItem: function(el) {
			this.set('activeItem', el);
			console.log('gbw open on ', Ember.$('#' + el));
		},

		updateSaveBoardItem: function(tolagraph) {
			console.log('update li with tolagraph');
			console.log(Ember.$('#' + this.get('activeItem') + ' li'));
			console.log(tolagraph);

			// render the tolagraph in the active li
			// update $tolagraphs object array

			this.saveTolaBoard();
		}

	}
});
