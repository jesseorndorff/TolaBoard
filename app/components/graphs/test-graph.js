import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function() {

		console.log('test graph this ',this);
		

		var config = this.get('tbItemConfig').graph.config;		
		/* so rendering inside the widget seemed to just involve grabbing the 
		   element, and using jquery to then get the canvas object 

		   We used the lower level gridster api to allow ember to place the UI
		   elements, and then programmatically update the underlying gridster
		   $widgets object and register the widget so we got all the functionality

		   With ember being able to do it's thing, by controlling the view, all
		   that was needed was to put a dynamically named component helper call
		   inside the render .hbs template, and that automatically gets a canvas
		   object inside the ember view, so when rendered it goes along for the ride
		   of the ember view and gridster li element. 

		   So... to make a graph render inside a widget, we need to update the
		   data underlying the dynamic component call to the graph*/
		var ctx = this.$('canvas');
		
		ctx.resize(function() {
			'resize detected';
		});

		var testChart = new Chart(ctx, config);
	}


	
});
