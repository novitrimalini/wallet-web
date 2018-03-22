import { mount } from 'enzyme';
import React from 'react';
import Filter from '../../js/components/Filter/Filter';
import FilterQuery from '../../js/components/Filter/FilterQuery';

describe('Filter', () => {
  describe('#updateQuery', () => {
    it('should update query state', () => {
      const wrapper = mount(<Filter/>);
      const filterQueryWrapper = wrapper.find(FilterQuery);
      const textInputWrapper = filterQueryWrapper.find('input').at(0);
      textInputWrapper.simulate('change', { target: { value: 'Go Pay' } });
      expect(wrapper.state('query')).toEqual('Go Pay');
    });
  });
});