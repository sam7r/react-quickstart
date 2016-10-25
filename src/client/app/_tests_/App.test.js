import test from 'blue-tape';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { componentSetup } from '../../../common/test-helper.js';
import App from '../App';

const props = {};

/** @test {App} */
test('App mounts', t => {
  spy(App.prototype, 'componentDidMount');
  mount(componentSetup(App, props));
  t.ok(App.prototype.componentDidMount.calledOnce, 'componentDidMount');
  App.prototype.componentDidMount.restore();
  t.end();
});

/** @test {App} */
test('App renders', t => {
  const component = mount(componentSetup(App, props));
  t.ok(!!component.render().find('#main-container').length,'div rendered');
  t.end();
});
