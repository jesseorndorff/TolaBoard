import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graphs/chartjs-pie', 'Integration | Component | graphs/chartjs pie', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graphs/chartjs-pie}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graphs/chartjs-pie}}
      template block text
    {{/graphs/chartjs-pie}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
