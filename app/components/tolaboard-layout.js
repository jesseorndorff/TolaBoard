import Ember from 'ember';

export default Ember.Component.extend({

	self: this,
	showGraphBuilder: false,
	/* array of tolaboard-items (ie. gridster widgets) */
	tolaboardItems: [],
	activeGraphBuilder: [],
	graphTarget: [],



	didInsertElement: function() {
		console.log('tolaboard from layout comp',this.get('tolaboard'));
		/*console.log('layout Component');
		console.log(this);*/

	},

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
		addItem: function() {			
			// push item into tolaboardItems array
			var newID = this.tolaboardItems.length;
			this.tolaboardItems.pushObject(newID);
			
			// just toggle showGraphBuilder once
			if(!this.showGraphBuilder) { 
				this.set('showGraphBuilder',true);
			}
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
		
	} // end actions object,

	
});
