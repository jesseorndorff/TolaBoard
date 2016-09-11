import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: "assets/data/tolaboards/collection-tolaboards.json?jsonp=?",
	shouldReloadAll: function() { 		
		return true; 
	}
});
