import Ember from 'ember';

/* Not entirely clear on what js file in routes folder is for
   it stores
*/
var FooBoard = Ember.Object.extend({
	title: "my generic title",
	dashboard: [{ widget: {},
				  graph: {component: 'graph comp name'}}]
});