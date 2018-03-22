import React from 'react';
import {shallow} from 'enzyme';
import App from '../js/components/App';
import Navigation from '../js/components/Navigation/Navigation';
import Stage from '../js/components/Navigation/Stage';

describe('App', function() {
  it('should render Navigation',() => {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains(<Navigation/>)).toEqual(true);
  });
  it('should render Stage',() => {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains(<Stage/>)).toEqual(true);
  });
});
