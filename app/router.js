import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('mydashboards');
  this.route('vizbuilder');
  this.route('datasources');
  
  /* Ember can't do optional dynamic segments :( 
  	First designer route goes to empty designer with options for
  	editing existing or building new.
  	Routes to editing an existing Tolaboard use the dynamic segment */
  // this.route('designer');

  /* ok, new approach... same dynamic segment route, but id=0 means new*/
  this.route('designer', {path: '/designer/:tolaboard_id'});
  /* */

  this.route('sharedboards');
  this.route('dashboards', {path: '/dashboards/:tolaboard_id'});
  this.route('dashboards-edit', {path: '/dashboards-edit/:tolaboard_id'});
});

export default Router;
