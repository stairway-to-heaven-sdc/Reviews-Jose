import React from 'react';
import User from '../client/components/User';
import { shallow, mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';

it('allows us to set props', () => {
  const wrapper = mount(<User user="7"></User>);
  expect(wrapper.props().user).toBe('7');
});

it('matches snapshot', () => {
  let component;
  act(() => {
    component = mount(<User user="7"></User>);
    // console.log(component.debug());
    expect(component).toMatchSnapshot();
  });
});

// import TestRenderer from 'react-test-renderer';
// const { act } = TestRenderer;
// import { act } from 'react-dom/test-utils';

// test('User test works', () => {
//   let component
//   act(() => {
//     // component = TestRenderer.create(<User user="7"></User>);
//     component = mount(< User />);
//   });
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot()
// });
