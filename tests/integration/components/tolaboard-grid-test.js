import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tolaboard-grid', 'Integration | Component | tolaboard grid', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tolaboard-grid}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tolaboard-grid}}
      template block text
    {{/tolaboard-grid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
