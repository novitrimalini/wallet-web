import { mount } from 'enzyme';
import React from 'react';
import TransactionItemDesktop from '../../js/components/Transaction/TransactionItemDesktop';

describe('TransactionItemDesktop', () => {
  describe('#ShowItemData', () => {
    it('should display transaction item', () => {
      const transactionData = [
        {
          date: '12/12/12',
          FromWallet: { id: 2, User: { name: 'iqbal' } },
          ToWallet: { id: 1, User: { name: 'cheetan' } },
          description: 'debt',
          amount: '600000',
        } ];
      const wrapper = mount(<TransactionItemDesktop transactionCollection={transactionData}
                                                    transactionWalletId={2}/>);
      const item = wrapper.find('tr').at(0);
      const dateColumn = item.find('td').at(0).text();
      const fromColoumn = item.find('td').at(1).text();
      const toColoumn = item.find('td').at(2).text();
      const descriptionColumn = item.find('td').at(3).text();
      const amountColumn = item.find('td').at(4).text();
      const actualOutput =
          `${dateColumn} ${fromColoumn} ${toColoumn} ${descriptionColumn} ${amountColumn}`;
      const expectedOutput = 'Wednesday, 12/12/2012, 12:00:00 am cheetan Debit debt 600000';
      expect(actualOutput).toBe(expectedOutput);
    });
    it('should display TOPUP transaction item', () => {
      const transactionData = [
        {
          date: '12/12/12',
          FromWallet: null,
          ToWallet: { id: 1, User: { name: 'cheetan' } },
          description: 'debt',
          amount: '600000',
        } ];
      const wrapper = mount(<TransactionItemDesktop transactionCollection={transactionData}
                                                    transactionWalletId={1}/>);
      const item = wrapper.find('tr').at(0);
      const dateColumn = item.find('td').at(0).text();
      const fromColoumn = item.find('td').at(1).text();
      const toColoumn = item.find('td').at(2).text();
      const descriptionColumn = item.find('td').at(3).text();
      const amountColumn = item.find('td').at(4).text();
      const actualOutput =
          `${dateColumn} ${fromColoumn} ${toColoumn} ${descriptionColumn} ${amountColumn}`;
      const expectedOutput = 'Wednesday, 12/12/2012, 12:00:00 am TOPUP Credit debt 600000';
      expect(actualOutput).toBe(expectedOutput);
    });

    it('should display WITHDRAW transaction item', () => {
      const transactionData = [
        {
          date: '12/12/12',
          FromWallet: { id: 1, User: { name: 'cheetan' } },
          ToWallet: null,
          description: 'debt',
          amount: '600000',
        } ];
      const wrapper = mount(<TransactionItemDesktop transactionCollection={transactionData}
                                                    transactionWalletId={1}/>);
      const item = wrapper.find('tr').at(0);
      const dateColumn = item.find('td').at(0).text();
      const fromColoumn = item.find('td').at(1).text();
      const toColoumn = item.find('td').at(2).text();
      const descriptionColumn = item.find('td').at(3).text();
      const amountColumn = item.find('td').at(4).text();
      const actualOutput =
          `${dateColumn} ${fromColoumn} ${toColoumn} ${descriptionColumn} ${amountColumn}`;
      const expectedOutput = 'Wednesday, 12/12/2012, 12:00:00 am WITHDRAW Debit debt 600000';
      expect(actualOutput).toBe(expectedOutput);
    });

    it('should display Debit transaction item', () => {
      const transactionData = [
        {
          date: '12/12/12',
          FromWallet: { id: 2, User: { name: 'cheetan' } },
          ToWallet: { id: 1, User: { name: 'iqbal' } },
          description: 'debt',
          amount: '600000',
        } ];
      const wrapper = mount(<TransactionItemDesktop transactionCollection={transactionData}
                                                    transactionWalletId={1}/>);
      const item = wrapper.find('tr').at(0);
      const dateColumn = item.find('td').at(0).text();
      const fromColoumn = item.find('td').at(1).text();
      const toColoumn = item.find('td').at(2).text();
      const descriptionColumn = item.find('td').at(3).text();
      const amountColumn = item.find('td').at(4).text();
      const actualOutput =
          `${dateColumn} ${fromColoumn} ${toColoumn} ${descriptionColumn} ${amountColumn}`;
      const expectedOutput = 'Wednesday, 12/12/2012, 12:00:00 am cheetan Credit debt 600000';
      expect(actualOutput).toBe(expectedOutput);
    });
  });
});