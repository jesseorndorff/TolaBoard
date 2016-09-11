import Model from 'ember-data/model';
import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

var attr = DS.attr;

export default DS.Model.extend({
	
	title: attr('string'),
	items: attr()

});
