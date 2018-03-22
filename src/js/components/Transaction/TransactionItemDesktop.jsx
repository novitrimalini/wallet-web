import moment from 'moment';
import React, { Component } from 'react';

export default class TransactionItemDesktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.transactionCollection.map((transaction, index) =>
        <tr key={index}>
          <td>{moment(transaction.date).format('dddd, DD/MM/YYYY, h:mm:ss a')}</td>
          <td>
            {transaction.FromWallet === null ? 'TOPUP' : (transaction.FromWallet.id !==
            this.props.transactionWalletId
                ? transaction.FromWallet.User.name
                : '')}
            {transaction.ToWallet === null ? 'WITHDRAW' : (transaction.ToWallet.id !==
            this.props.transactionWalletId
                ? transaction.ToWallet.User.name
                : '')}
          </td>
          <td>
            {transaction.FromWallet !== null ? (transaction.FromWallet.id === this.props.transactionWalletId ? 'Debit' : '') : ''}
            {transaction.ToWallet !== null ? (transaction.ToWallet.id === this.props.transactionWalletId ? 'Credit' : '') : ''}
          </td>
          <td>{transaction.description}</td>
          <td>{transaction.amount}</td>
        </tr>,
    );
  }
}