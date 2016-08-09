import DS from 'ember-data';


/* Rest Adapter is at application level, so probably means available
   across all routes?
   */
export default DS.RESTAdapter.extend({
	host: "assets/data/tolaboards/collection-tolaboards.json?jsonp=?",
	shouldReloadRecord: function() { return true; }
});


