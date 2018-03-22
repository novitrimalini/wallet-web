import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../js/components/App';
import Transaction from '../../js/components/Transaction/Transaction';
import UserBalance from '../../js/components/UserBalance';
import UserName from '../../js/components/UserName';

describe('#Stage', () => {
  describe('/dashboard', () => {
    it('Should contains Username', () => {
      const wrapper = mount(<MemoryRouter initialEntries={[ '/dashboard' ]}><App/></MemoryRouter>);
      expect(wrapper.contains(UserName)).toEqual(true);
    });
    it('Should contains UserBalance', () => {
      const wrapper = mount(<MemoryRouter initialEntries={[ '/dashboard' ]}><App/></MemoryRouter>);
      expect(wrapper.contains(UserBalance)).toEqual(true);
    });
  });
  describe('/home', () => {
    it('Should contains Username', () => {
      const wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App/></MemoryRouter>);
      expect(wrapper.contains(Transaction)).toEqual(true);
    });
  });
});

