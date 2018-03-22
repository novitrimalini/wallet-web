import React from 'react';
import { shallow, mount } from 'enzyme';
import Transferform from '../js/TransferForm';

describe('Transferform', () => {
  describe('handleFrom', () => {
    it('should return Name of owner WalletId', () => {
      const wrapper = shallow(<Transferform />);
      const data = {
        name: 'Budi',
      };
      wrapper.state(data);
      const from = wrapper.find('span');
      expect(from.text()).toEqual('Budi');
    });
  });
  describe('handleAmount', () => {
    it('should return amount of transfer', () => {
      const wrapper = shallow(<Transferform/>);
      const inputAmount = wrapper.find('.amount');
      inputAmount.simulate('change',{
        target:{
          value: '250000',
        },
      });
      expect(wrapper.state('amount')).toEqual('250000');
    });
  });
  describe('handleDescription', () => {
    it('should return text on textarea as description', () => {
      const wrapper = shallow(<Transferform/>);
      const inputDescription = wrapper.find('.description');
      inputDescription.simulate('change',{
        target:{
          value: 'hello this is text',
        },
      });
      expect(wrapper.state('description')).toEqual('hello this is text');
    });
  });
  describe('handleReceiver', () => {
    it('should return correct value of payee list ', () => {
      const wrapper = shallow(<Transferform/>);
      const data = {
        name : 'Doni',
      };
      wrapper.state(data);
      const to = wrapper.find('a').at(0);
      expect(to.text()).toEqual('Doni');
    });
  });
  describe('handleSubmit', () => {
    it('should call callback with given data', () => {
      const mockData = {
        from : 'Budi',
        to : 'Doni',
        amount : '30000',
        description : 'pay go food'
      };
      const mockFunction = jest.fn();
      const wrapper = mount(<Transferform onSubmit={mockFunction}/>);
      const submit = wrapper.find('.submit');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(mockFunction).toHaveBeenCalled();
      expect(mockFunction).toHaveBeenLastCalledWith(mockData);
    });
    it('should call errorInvalid if any of field is empty', () => {
      const mockData = {
        from : '',
        to : '',
        amount : '',
        description : ''
      };
      const mockFunction = jest.fn();
      const wrapper = mount(<Transferform onSubmit={mockFunction}/>);
      const submit = wrapper.find('.submit');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('errorInvalid')).toEqual('Please fill empty field')
    });
  });
});