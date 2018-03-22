import { shallow } from 'enzyme';
import React from 'react';
import TransactionDesktop from '../../js/components/Transaction/TransactionDesktop';
import TransactionItemDesktop from '../../js/components/Transaction/TransactionItemDesktop';

describe('TransactionDesktop', () => {
  describe('#render', () => {
    it('should render Table ', () => {
      const wrapper = shallow(<TransactionDesktop/>);
      expect(wrapper.find('table').length).toEqual(1);
    });

    it('should render Transaction Item Desktop', () => {
      const wrapper = shallow(<TransactionDesktop/>);
      expect(wrapper.contains(<TransactionItemDesktop/>)).toEqual(true);
    });
  });
});