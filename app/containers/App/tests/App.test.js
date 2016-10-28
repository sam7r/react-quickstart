import test from 'blue-tape';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { componentSetup } from 'internals/test-utils';
import App from 'containers/App';

const props = {};

/** @test {App} */
test('App renders', t => {
  const component = mount(componentSetup(App, props));
  t.ok(!!component.render().find('#app-container').length,'app container rendered');
  t.end();
});

/** @test {App} */
test('App renders children', t => {
  const child = <h1>App Container</h1>;
  const component = shallow(<App>{ child }</App>);
  t.ok(component.contains(child),'app container rendered children');
  t.end();
});
