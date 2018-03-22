import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TransactionItemDesktop from './TransactionItemDesktop';

export default class TransactionDesktop extends Component {

  render() {
    return (
        <div className={'transaction-display-desktop'}>
          <table className={'table table-bordered'}>
            <thead>
            <tr>
              <th>date</th>
              <th>From/To</th>
              <th>Debit/Credit</th>
              <th>description</th>
              <th>amount</th>
            </tr>
            </thead>
            <tbody>
            <TransactionItemDesktop transactionCollection={this.props.transactionCollection} transactionWalletId={this.props.transactionWalletId}/>
            </tbody>
          </table>
        </div>
    );
  }
}
TransactionDesktop.propTypes = {
  transactionCollection: PropTypes.array.required,
  transactionWalletId: PropTypes.number.required,
};
