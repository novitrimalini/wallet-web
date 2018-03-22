import React from 'react';
import { mount, shallow } from 'enzyme';
import Homepage from '../js/components/Homepage';
import Transaction from '../js/components/Transaction/Transaction';
import store from 'simple-global-store';

describe('Homepage', () => {
  beforeEach(() => {
    store.clear();
  });

  afterEach(() => {
    store.clear();
  });
  describe('#handleWelcome', () => {
    it('with name of username', () => {
      const mockFn = jest.fn();
      store.addChangeListener(mockFn);
      store.update({name: 'iqbal'});
      const wrapper = shallow(<Homepage/>);
      const heading = wrapper.find('#WelcomeMessage');
      expect(heading.text()).toBe(`Hello, iqbal`);
    });
    it('with another name of another username', () => {
      const mockFn = jest.fn();
      store.addChangeListener(mockFn);
      store.update({name: 'admin'});
      const wrapper = shallow(<Homepage/>);
      const heading = wrapper.find('#WelcomeMessage');
      expect(heading.text()).toBe(`Hello, admin`);
    });
  });
  describe('render', () => {
    it('should contains Transaction', () => {
      const wrapper = shallow(<Homepage/>);
      expect(wrapper.find(Transaction).length).toBe(1);
    });
  });
});