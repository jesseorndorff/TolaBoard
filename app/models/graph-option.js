import Model from 'ember-data/model';
import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

var attr = DS.attr;

export default Model.extend({
	label: DS.attr('string'),
	img: DS.attr('string'),
	component: DS.attr('string'),
	dataModel: DS.attr()

});