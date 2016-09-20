import Ember from 'ember';

export default Ember.Service.extend({
	currentUser: {fName: 'Tamsyn'},
	login: function(user) {
		this.set('currentUser',user);
	},
	logout: function(user) {
		this.set('currentUser',null);
	}
});
