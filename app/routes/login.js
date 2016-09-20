/* Handles the single-signon using Google's oAuth2 

   The template contains the intro to TolaBoard, along with the google button.
   User clicks, and gets prompted by google to verify sharing of info with app.
   js file needs to ta
   */
import Ember from 'ember';
import injectScript from 'ember-inject-script';

export default Ember.Route.extend({
	/* https://www.npmjs.com/package/ember-cli-meta-tags*/
	headTags: [{type: 'meta',
				// tagId: 'name',
				attrs: {
      				name: 'google-signin-scope',
      				content: 'profile email'
    			}/*,
	    		// optional element content 
	    		content: 'Element content here'*/
  				},
  				{type: 'meta',
				// tagId: 'name',
				attrs: {
      				name: 'google-signin-client_id',
      				content: '469831917669-hi4tku7ob2j0k5tapf8856225q2hk7lr.apps.googleusercontent.com'
    			}}],

	session: Ember.inject.service(),

	init: function() {
		this._super(...arguments);

		// kludgy way to inject google script, perhaps a cli add-on will exist someday
		var scriptIsLoaded = $("script[src='https://apis.google.com/js/platform.js']")[0];
		if (!scriptIsLoaded) {
			injectScript("https://apis.google.com/js/platform.js").then(function() {
							      
			});
		}
	},

	actions: {
		login: function(user) {
			this.get('session').login(user)
		}


	}
});
