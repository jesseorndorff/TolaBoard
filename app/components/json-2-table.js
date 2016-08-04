import Ember from 'ember';

export default Ember.Component.extend({

	didRenderCounter: 0,

	didFullyRender: function() {
		// this.set('showVizSelection', true);
	},

	didUpdate: function() {
		this.set('showVizSelection', true);
	},


	didRender: function() {
		this.didRenderCounter += 1;
		if(this.didRenderCounter === 2) {
			this.didFullyRender();
		}
		
	},

	

	didInsertElement: function() {
		// console.log('didInsertElement on json-2-table invoked');
	}
});
