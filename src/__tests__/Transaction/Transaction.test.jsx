import { mount } from 'enzyme/build/index';
import moxios from 'moxios';
import React from 'react';
import Transaction from '../../js/components/Transaction/Transaction';

describe('Transaction', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('#FetchData', () => {
    it('should fetch transaction data', (done) => {
      const wrapper = mount(<Transaction/>);
      const response = [];
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('transactionCollection')).toEqual(response);
          done();
        });
      });

    });
    it('should fetch transaction data with filter amount', (done) => {
      const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                         transactionFilterMode={'greater'}
                                         transactionFilterValue={'20000'}/>);
      const response = [];
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('transactionCollection')).toEqual(response);
          done();
        });
      });
    });
    it('should fetch transaction data with filter description', (done) => {
      const wrapper = mount(<Transaction transactionFilterColumn={'description'}
                                         transactionFilterValue={'Go Pay'}/>);
      const response = [];
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('transactionCollection')).toEqual(response);
          done();
        });
      });
    });

    it('should fetch transaction data with sort amount', (done) => {
      const wrapper = mount(<Transaction transactionSortColumn={'amount'}
                                         transactionSortValue={'20000'}/>);
      const response = [];
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        }).then(() => {
          expect(wrapper.state('transactionCollection')).toEqual(response);
          done();
        });
      });
    });
    describe('Update props fetch', () => {
      it('Should fetch transaction data with filter amount greater', (done) => {
        const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                           transactionFilterMode={'greater'}
                                           transactionFilterValue={'20000'}/>);
        wrapper.setProps({
          transactionFilterColumn: 'amount',
          transactionFilterMode: 'greater',
          transactionFilterValue: '20000',
        });
        const response = [];
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: response,
          }).then(() => {
            expect(wrapper.state('transactionCollection')).toEqual(response);
            done();
          });
        });
      });
      it('Should fetch transaction data with filter amount lesser', (done) => {
        const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                           transactionFilterMode={'greater'}
                                           transactionFilterValue={'20000'}/>);
        wrapper.setProps({
          transactionFilterColumn: 'amount',
          transactionFilterMode: 'lesser',
          transactionFilterValue: '30000',
        });
        const response = [];
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: response,
          }).then(() => {
            expect(wrapper.state('transactionCollection')).toEqual(response);
            done();
          });
        });
      });
      it('Should re-fetch transaction data with filter description', (done) => {
        const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                           transactionFilterMode={'greater'}
                                           transactionFilterValue={'20000'}/>);
        wrapper.setProps({
          transactionFilterColumn: 'description',
          transactionFilterValue: 'go food',
        });
        const response = [];
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: response,
          }).then(() => {
            expect(wrapper.state('transactionCollection')).toEqual(response);
            done();
          });
        });
      });
      it('Should re-fetch transaction data with sort amount', (done) => {
        const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                           transactionFilterMode={'greater'}
                                           transactionFilterValue={'20000'}/>);
        wrapper.setProps({
          transactionSortColumn: 'amount',
          transactionSortValue: 'DESC',
          limitFetching:5,
        });
        const response = [];
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: response,
          }).then(() => {
            expect(wrapper.state('transactionCollection')).toEqual(response);
            done();
          });
        });
      });
      it('Should re-fetch transaction data without re-fetch', (done) => {
        const wrapper = mount(<Transaction transactionFilterColumn={'amount'}
                                           transactionFilterMode={'greater'}
                                           transactionFilterValue={'20000'}/>);
        wrapper.setProps({
          transactionFilterColumn : null,
          transactionFilterValue: 'Grab-Send',
          transactionSortColumn: 'amount',
          transactionSortValue: 'DESC',
          limitFetching:5,
        });
        const response = [];
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: response,
          }).then(() => {
            expect(wrapper.state('transactionCollection')).toEqual(response);
            done();
          });
        });
      });
    });

  });

});