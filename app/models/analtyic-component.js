import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

var attr = DS.attr;

export default Model.extend({
	type: attr('string'),
	label: attr('string')
});
