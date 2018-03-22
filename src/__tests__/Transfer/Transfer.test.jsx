import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import Payeelist from '../../js/components/Transfer/Payeelist';
import Transfer from '../../js/components/Transfer/Transfer';
import store from 'simple-global-store';

describe('Transfer', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('componentDidMount', () => {
    it('should change payeeList state after rendered', (done) => {
      store.update({userId: 1});
      const wrapper = shallow(<Transfer />);
      moxios.wait(() => {
        let request = moxios.requests.at(0);
        return request.respondWith({
          status: 200,
          response: [ { id: 1, name: 'Test' } ],
        }).then(() => {
          return moxios.requests.at(1).respondWith({status: 200, response: {id: 1}});
        }).then(() => {
          expect(wrapper.state('payeeList')).toEqual([ { id: 1, name: 'Test' } ]);
          done();
        });
      });
    });

    it('should change payeeList state to empty array when error happen while get payee list',
        (done) => {
          const wrapper = shallow(<Transfer />);
          moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
              status: 500,
            }).then(() => {
              expect(wrapper.state('payeeList')).toEqual([]);
              done();
            });
          });
        });
  });

  describe('handleFrom', () => {
    it('should return Name of owner WalletId', () => {
      const wrapper = mount(<Transfer />);
      wrapper.setState({
        name: 'Budi',
      });
      const from = wrapper.find('span').at(0);
      expect(from.text()).toEqual('Budi');
    });
  });

  describe('handleAmount', () => {
    it('should return amount of transfer', () => {
      const wrapper = shallow(<Transfer />);
      const inputAmount = wrapper.find('.amount');
      inputAmount.simulate('change', {
        target: {
          value: '250000',
        },
      });
      expect(wrapper.state('amount')).toEqual('250000');
    });
  });

  describe('handleDescription', () => {
    it('should return text on textarea as description', () => {
      const wrapper = shallow(<Transfer />);
      const inputDescription = wrapper.find('.description');
      inputDescription.simulate('change', {
        target: {
          value: 'hello this is text',
        },
      });
      expect(wrapper.state('description')).toEqual('hello this is text');
    });
  });

  describe('handle changing PayeeList', () => {
    it('should change "to" state when payeeList changing', (done) => {
      const wrapper = mount(<Transfer />);
      wrapper.setState({
        payeeList: [{walletId: 1, name: 'Test'}],
      })
      const payeeListWrapper = wrapper.find(Payeelist);
      const comboboxElement = payeeListWrapper.find('#comboPayee');
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
          expect(wrapper.state('to').walletId).toEqual(1);
          done();
        });
      });
    });
  });

  describe('handleSubmit', () => {
    it('should change message state to Success', (done) => {
      const wrapper = mount(<Transfer />);
      wrapper.setState({
        amount: 1000,
        description: 'transfer',
        to: {
          walletId: 2,
        },
        from: {
          walletId: 3,
        },
      });
      const submit = wrapper.find('.submit-send');
      submit.simulate('click');
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

    it('should change message state to Insufficient Amount when balance not enough', (done) => {
      const wrapper = mount(<Transfer />);
      wrapper.setState({
        amount: 30000,
        description: 'transfer',
        to: {
          walletId: 2,
        },
        from: {
          walletId: 3,
        },
      });
      const submit = wrapper.find('.submit-send');
      submit.simulate('click');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 406,
          response: {
            message: 'Insufficient Amount',
          },
        }).then(() => {
          expect(wrapper.state('message')).toEqual('Insufficient Amount');
          done();
        });
      });
    });

    it('should call message if amount is empty', () => {
      const mockData = {
        from: 'Budi',
        to: 'Doni',
        amount: '',
        description: 'pay go food',
      };
      const wrapper = mount(<Transfer />);
      const submit = wrapper.find('.submit-send');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('message')).toEqual('Amount is require');
    });

    it('should change message state when amount is 0', () => {
      const mockData = {
        from: 'Budi',
        to: 'Doni',
        amount: '0',
        description: 'pay go food',
      };
      const wrapper = mount(<Transfer />);
      const submit = wrapper.find('.submit-send');
      wrapper.setState(mockData);
      submit.simulate('click');
      expect(wrapper.state('message')).toEqual('Invalid amount');
    });

    describe('after submit', () => {
      it('should reset field to blank', (done) => {
        const wrapper = mount(<Transfer />);
        wrapper.setState({
          amount: 1000,
          description: 'Abc',
          to: {
            walletId: 2,
          },
          from: {
            walletId: 3,
          },
        });
        const submit = wrapper.find('.submit-send');
        submit.simulate('click');
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          }).then(() => {
            expect(wrapper.state('amount')).toEqual('');
            expect(wrapper.state('description')).toEqual('');
            done();
          });
        });
      });
    });
  });
});
