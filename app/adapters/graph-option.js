import DS from 'ember-data';

export default DS.RESTAdapter.extend({	
	host: 'assets/data/graph-options.json?jsonp=?',
	shouldReloadAll: function() {
		return true; 
	}
});

