import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('render-tolaboard-item', 'Integration | Component | render tolaboard item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{render-tolaboard-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#render-tolaboard-item}}
      template block text
    {{/render-tolaboard-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
