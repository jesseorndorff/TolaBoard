import Ember from 'ember';

export default Ember.Service.extend({

	mutedPalette: ['#796300','#7A3500','#10A400','#9E0060','#CF102E','#DB5E11','#0B8D70',
		 '#1F7400','#4BC4BF','#082A73','#9B8000','#FF7100','#FFD200','#FFFD00',
		 '#6F0AAB','#9650C0','#E89424','#7F7F7F','#C5000A','#1F6295'],

	classicPalette: d3.scale.category20().range()
});
