import React from 'react';
import { mount } from 'enzyme';
import FilterQuery from '../../js/components/Filter/FilterQuery.jsx';

describe('FilterQuery', () => {
  describe('#_onChangeQuery', () => {
    it('should call callback when query change', () => {
      const mockCallback = jest.fn();
      const wrapper = mount(<FilterQuery onChange={mockCallback}/>);
      const inputElement = wrapper.find('.filter-query--input');
      inputElement.simulate('change', {
        target: {
          value: 'test',
        },
      });

      expect(mockCallback).toHaveBeenCalled();
    });

    it('should call callback when query change with given data', () => {
      const mockCallback = jest.fn();
      const wrapper = mount(<FilterQuery onChange={mockCallback}/>);
      const inputElement = wrapper.find('.filter-query--input');
      inputElement.simulate('change', {
        target: {
          value: 'anothertest',
        },
      });

      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith('anothertest');
    });
  });
});