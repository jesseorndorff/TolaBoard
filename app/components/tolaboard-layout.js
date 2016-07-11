import Ember from 'ember';

export default Ember.Component.extend({


	/* array of tolaboard-items (ie. gridster widgets) */
	tolaboardItems: [],
	activeGraphBuilder: [],
	graphTarget: [],

	didInsertElement: function() {
		console.log('this in layout ',this);

	},

	actions: {
		addItem: function() {			

			// push item into tolaboardItems array
			var newID = this.tolaboardItems.length;
			this.tolaboardItems.pushObject(newID);			

		}
	}
});
