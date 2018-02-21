import React from 'react';
import Header from '../components/Header';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

test('Component should match the snapshot', () => {
  const component = renderer.create(<Header />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

const header = shallow(<Header />);

test('Component should display proper header', () => {
  header
    .find('h1')
    .forEach((h1, i) => 
      i ?
        expect(h1.text()).toEqual('Software Engineer/Web Developer'):
        expect(h1.text()).toEqual('Full Stack')
    );
});

test('Component mounts with correct state', () => {
  const state = header.state();
  const expectedState = { 
    hide: true,
    arrow: false,
    hello: '',
    particle: true
  };
  expect(state).toMatchObject(expectedState);
});