import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('render-tolaboard', 'Integration | Component | render tolaboard', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{render-tolaboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#render-tolaboard}}
      template block text
    {{/render-tolaboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
