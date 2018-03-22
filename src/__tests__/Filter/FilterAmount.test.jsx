import React from 'react';
import { mount } from 'enzyme';
import FilterAmount from '../../js/components/Filter/FilterAmount.jsx';

describe('FilterQuery', () => {
  describe('#_onChangeInput', () => {
    it('should change amount query state', () => {
      const wrapper = mount(<FilterAmount onChange={jest.fn()}/>);
      const inputElement = wrapper.find('.filter-query--amount');
      inputElement.simulate('change', {
        target: {
          value: '50',
        },
      });

      expect(wrapper.state('amount')).toEqual('50');
    });

    it('should change amount query state "47"', () => {
      const wrapper = mount(<FilterAmount onChange={jest.fn()}/>);
      const inputElement = wrapper.find('.filter-query--amount');
      inputElement.simulate('change', {
        target: {
          value: '47',
        },
      });

      expect(wrapper.state('amount')).toEqual('47');
    });
  });

  describe('#_onSubmitLesser', () => {
    it('should call callback if button lesser click', () => {
      const mockCallback = jest.fn();
      const wrapper = mount(<FilterAmount onChange={jest.fn()} onClick={mockCallback}/>);
      const buttonLesser = wrapper.find('.button-amount--lesser');

      buttonLesser.simulate('click');

      expect(mockCallback).toHaveBeenCalled();
    });

    it('should call callback with proper data if button lesser click', () => {
      const mockCallback = jest.fn();
      const mockData = {
        amount: '',
        filterAmountMethod: 'lesser',
      };
      const wrapper = mount(<FilterAmount onChange={jest.fn()} onClick={mockCallback}/>);
      const buttonLesser = wrapper.find('.button-amount--lesser');

      buttonLesser.simulate('click');

      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(mockData);
    });
  });

  describe('#_onSubmitGreater', () => {
    it('should call callback if button greater click', () => {
      const mockCallback = jest.fn();
      const wrapper = mount(<FilterAmount onChange={jest.fn()} onClick={mockCallback}/>);
      const buttonGreater = wrapper.find('.button-amount--greater');

      buttonGreater.simulate('click');

      expect(mockCallback).toHaveBeenCalled();
    });

    it('should call callback with proper data if button greater click', () => {
      const mockCallback = jest.fn();
      const mockData = {
        amount: '',
        filterAmountMethod: 'greater',
      };
      const wrapper = mount(<FilterAmount onChange={jest.fn()} onClick={mockCallback}/>);
      const buttonGreater = wrapper.find('.button-amount--greater');

      buttonGreater.simulate('click');

      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(mockData);
    });
  });
});