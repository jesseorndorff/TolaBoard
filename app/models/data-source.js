import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	sourceID: attr('string'),
	type: attr('string'),
	url: attr('string'),
	label: attr('string'),	
	lastUpdate: attr('date')

});
