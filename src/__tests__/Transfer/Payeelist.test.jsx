import { mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import Payeelist from '../../js/components/Transfer/Payeelist';

describe('PayeeList', () => {
  describe('#showRowData', () => {
    it('should display payeelist', () => {
      const payee = [ { name: 'dona' } ];
      const wrapper = mount(<Payeelist payeelisting={payee} />);
      const optionrow = wrapper.find('select').at(0);
      let nameColoumn = optionrow.find('option').at(0).text();
      const actualOutput = `${nameColoumn}`;
      const expectedOutput = 'dona';
      expect(actualOutput).toBe(expectedOutput);
    });
    it('should display another payeelist', () => {
      const payee = [ { name: 'doni' } ];
      const wrapper = mount(<Payeelist payeelisting={payee} />);
      const optionrow = wrapper.find('select').at(0);
      let nameColoumn = optionrow.find('option').at(0).text();
      const actualOutput = `${nameColoumn}`;
      const expectedOutput = 'doni';
      expect(actualOutput).toBe(expectedOutput);
    });
  });

  describe('#_onChangeCombo', () => {
    it('should change value state when combobox change', () => {
      const payee = [ { name: 'dona' } ];
      const wrapper = mount(<Payeelist payeelisting={payee} />);
      const comboboxElement = wrapper.find('#comboPayee');
      comboboxElement.simulate('change', {
        target: {
          value: 'dona',
        },
      });
      expect(wrapper.state('value')).toBe('dona');
    });

    it('should call the callback when combobox change', (done) => {
      const mockFn = jest.fn();
      const payee = [ { name: 'doni' } ];
      const wrapper = mount(<Payeelist payeelisting={payee} callbackFunction={mockFn} />);
      const comboboxElement = wrapper.find('#comboPayee');
      comboboxElement.simulate('change', {
        target: {
          value: 'dona',
        },
      });
      const response = {
        id: 1,
      };
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(mockFn).toHaveBeenCalledTimes(1);
          expect(mockFn).toHaveBeenCalledWith(1);
          done();
        });
      });
    });
  });
});

