import { shallow,mount } from 'enzyme/build/index';
import moxios from 'moxios';
import React from 'react';
import UserBalance from '../js/components/UserBalance';

describe('Dashboard', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('#ShowData', () => {
    it('with name and balance of username', () => {
      const wrapper = shallow(<UserBalance/>);
      const data = {
        balance: '400000',
      };
      wrapper.setState(data);
      const balance = wrapper.find('#wallet-balance');
      expect(balance.text()).toBe('Rp.400000,-');
    });
  });
  describe('fetch data', () => {
    it('should fetch name data', (done) => {
      const wrapper = mount(<UserBalance/>);
      const response = {balance:10000};

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('balance')).toEqual(10000);
          done();
        });
      });
    });
  });
});
