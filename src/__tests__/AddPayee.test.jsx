import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import AddPayee from '../js/AddPayee';

describe('AddPayee', () => {

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('_onChangeText', () => {
    it('should change username state to andi when user input username andi', () => {
      const wrapper = shallow(<AddPayee />);
      const inputPayee = wrapper.find('#username');
      inputPayee.simulate('change', {
        target: {
          value: 'andi',
        },
      });
      expect(wrapper.state('username')).toBe('andi');
    });

    it('should change username state to ali when user input username ali', () => {
      const wrapper = shallow(<AddPayee />);
      const inputPayee = wrapper.find('#username');
      inputPayee.simulate('change', {
        target: {
          value: 'ali',
        },
      });
      expect(wrapper.state('username')).toBe('ali');
    });

    it('should reset message state when user input username', () => {
      const wrapper = shallow(<AddPayee />);
      const inputPayee = wrapper.find('#username');
      wrapper.setState({
        message: 'User Not Found',
      });
      inputPayee.simulate('change', {
        target: {
          value: 'ali',
        },
      });
      expect(wrapper.state('message')).toBe('');
    });
  });

  describe('_onClickButtonSearch', () => {
    it('should reset payee state when button search clicked', () => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        payee: {
          id: 1,
          username: 'test',
          name: 'Testing',
        },
      });
      const searchButton = wrapper.find('#searchPayee');
      searchButton.simulate('click');
      expect(wrapper.state('payee')).toEqual('');
    });

    it('should reset message state when button search clicked', () => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        username: 'Test',
        message: 'User Not Found',
      });
      const searchButton = wrapper.find('#searchPayee');
      searchButton.simulate('click');
      expect(wrapper.state('message')).toEqual('');
    });

    it('should change payee state when button search clicked', (done) => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        username: 'eddocip',
      });
      const button = wrapper.find('#searchPayee');
      button.simulate('click');

      const response = {
        id: 1,
        username: 'eddocip',
        name: 'eddo',
      };
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('payee')).toEqual(response);
          done();
        });
      });
    });

    it('should change message state to "Username Payee required" when username is empty and button search clicked"',
        () => {
          const wrapper = mount(<AddPayee />);
          const button = wrapper.find('#searchPayee');
          button.simulate('click');
          expect(wrapper.state('message')).toEqual('Username Payee required');
        });

    it('should change message state when specified username not found', (done) => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        username: 'eddocipa',
      });
      const button = wrapper.find('#searchPayee');
      button.simulate('click');

      const response = {
        message: 'User Not Found',
      };
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: response,
        }).then(() => {
          expect(wrapper.state('message')).toEqual(response.message);
          done();
        });
      });
    });
  });

  describe('_onClickButtonAdd', () => {
    it('should change message state to Success when success add payee', (done) => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        payee: {
          id: 2,
          username: 'runner29',
          name: 'Runner',
        },
      });
      const button = wrapper.find('#addPayee');
      button.simulate('click');
      const response = {
        user_id: 1,
        friend_id: 2,
      };
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('message')).toEqual('Success');
          done();
        });
      });
    });

    it('should change message state to Payee Already Exist when add same payee', (done) => {
      const wrapper = mount(<AddPayee />);
      wrapper.setState({
        payee: {
          id: 2,
          username: 'runner29',
          name: 'Runner',
        },
      });
      const button = wrapper.find('#addPayee');
      button.simulate('click');
      const response = {
        message: 'Payee Already Exist',
      };
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 409,
          response: response,
        }).then(() => {
          expect(wrapper.state('message')).toEqual('Payee Already Exist');
          done();
        });
      });
    });
  });
});