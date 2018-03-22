import { shallow } from 'enzyme/build/index';
import React from 'react';
import Dashboard from '../js/components/Dashboard';
import UserBalance from '../js/components/UserBalance';
import UserName from '../js/components/UserName';

describe('Dashboard', () => {
  describe('render', function() {
    it('should render Dashboard Name Component', () => {
      const wrapper = shallow(<Dashboard/>);
      expect(wrapper.contains(<UserName/>)).toEqual(true);
    });
    it('should render Dashboard Balance Component', () => {
      const wrapper = shallow(<Dashboard/>);
      expect(wrapper.contains(<UserBalance/>)).toEqual(true);
    });
  });
  describe('handle submit', () => {
    it('should update dashboard', () => {
      const wrapper = shallow(<Dashboard />);
      wrapper.setState({});
    });
  });
});
