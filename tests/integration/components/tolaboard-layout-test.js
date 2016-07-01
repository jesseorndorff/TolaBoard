import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tolaboard-layout', 'Integration | Component | tolaboard layout', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tolaboard-layout}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tolaboard-layout}}
      template block text
    {{/tolaboard-layout}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
