import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graphs/test-graph', 'Integration | Component | graphs/test graph', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graphs/test-graph}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graphs/test-graph}}
      template block text
    {{/graphs/test-graph}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
