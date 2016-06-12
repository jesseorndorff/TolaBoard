import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('mydashboards');
  this.route('vizbuilder');
  this.route('datasources');
  this.route('designer');
});

export default Router;
