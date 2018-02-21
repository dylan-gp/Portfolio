import React from 'react';
import Portfolio from '../components/Portfolio';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

Object.defineProperty(window, "matchMedia", {
  value: jest.fn(() => { return { matches: true } })
});

const header = shallow(<Portfolio />);

test('Component should match the snapshot', () => {
  const component = renderer.create(<Portfolio />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('Component mounts with correct state', () => {
  const state = header.state();
  const expectedState = {
    codersCode: false,
    hideLeft: true,
    hideRight: false,
    currentText: ''
  };
  expect(state).toMatchObject(expectedState);
});