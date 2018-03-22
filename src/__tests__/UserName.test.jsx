import { shallow } from 'enzyme/build/index';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import UserName from '../js/components/UserName';

describe('Dashboard', () => {
  beforeEach(() => {
    store.clear();
    moxios.install();
  });
  afterEach(() => {
    store.clear();
    moxios.uninstall();
  });
  describe('#ShowData', () => {
    it('with name and balance of username', () => {
      const mockFn = jest.fn();
      store.addChangeListener(mockFn);
      store.update({ name: 'iqbal' });
      const wrapper = shallow(<UserName />);
      const username = wrapper.find('#username');
      expect(username.text()).toBe(`Hello, iqbal`);
    });
  });
});
