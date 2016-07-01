import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graphs/chartjs-bar', 'Integration | Component | graphs/chartjs bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graphs/chartjs-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graphs/chartjs-bar}}
      template block text
    {{/graphs/chartjs-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
