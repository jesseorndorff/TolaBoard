import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helpers/graph-builder-widget', 'Integration | Component | helpers/graph builder widget', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{helpers/graph-builder-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#helpers/graph-builder-widget}}
      template block text
    {{/helpers/graph-builder-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
