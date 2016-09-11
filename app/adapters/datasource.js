import DS from 'ember-data';

export default DS.RESTAdapter.extend({	
	host: 'assets/data/data-sources2.json?jsonp=?',
	shouldReloadAll: function() {
		return true; 
	}
});

