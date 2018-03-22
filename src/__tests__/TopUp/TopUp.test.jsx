import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import TopUp from '../../js/components/TopUp/TopUp';

describe('TopUpWallet', () => {
  describe('handleAmountTopUp', () => {
    it('Should return correct amount when user input top up', () => {
      const wrapper = shallow(<TopUp/>);
      const inputAmount = wrapper.find('#amount');
      inputAmount.simulate('change', {
        target: {
          value: '12300000',
        },
      });
      expect(wrapper.state('amount')).toBe('12300000');
    });
    it('Should return another correct amount when user input top up', () => {
      const wrapper = shallow(<TopUp/>);
      const inputAmount = wrapper.find('#amount');
      inputAmount.simulate('change', {
        target: {
          value: '34000000',
        },
      });
      expect(wrapper.state('amount')).toBe('34000000');
    });
  });
  describe('handleSubmit', () => {
    it('should change state message to Amount Required when amount is empty', () => {
      const mockData = {
        amount: '',
      };
      const wrapper = mount(<TopUp/>);
      const submit = wrapper.find('#submit');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('message')).toEqual('Amount Required');
    });

    it('should change state message to Invalid Amount when amount is 0', () => {
      const mockData = {
        amount: '0',
      };
      const wrapper = mount(<TopUp/>);
      const submit = wrapper.find('#submit');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('message')).toEqual('Invalid Amount');
    });

    it('should change state message to Invalid Amount when amount is lesser than 0', () => {
      const mockData = {
        amount: '-111',
      };
      const wrapper = mount(<TopUp/>);
      const submit = wrapper.find('#submit');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('message')).toEqual('Invalid Amount');
    });

    it('should change message state to Success when success top up wallet', (done) => {
      const wrapper = mount(<TopUp/>);
      wrapper.setState({
        amount: '1000',
      });
      const button = wrapper.find('#submit');
      button.simulate('click');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        }).then(() => {
          expect(wrapper.state('message')).toEqual('Success');
          done();
        });
      });
    });
    it('should blank the field if transaction is processed', (done) => {
      const wrapper = mount(<TopUp/>);
      wrapper.setState({
        amount: '1000',
      });
      const button = wrapper.find('#submit');
      button.simulate('click');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        }).then(() => {
          expect(wrapper.state('amount')).toEqual('');
          done();
        });
      });
    });
  });
});