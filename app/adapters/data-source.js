import DS from 'ember-data';


/* Rest Adapter is at application level, so probably means available
   across all routes?
 

   */
export default DS.RESTAdapter.extend({
	host: "data/demo-blog-entry.json?jsonp=?",
	shouldReloadAll: function() { return true; }
});


