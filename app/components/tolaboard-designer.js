import Ember from 'ember';

export default Ember.Component.extend({	
	showDesigner: false,	
	actions: {
		toggleNewBoard: function() { 
			this.toggleProperty('showDesigner');
		}
	}
});
