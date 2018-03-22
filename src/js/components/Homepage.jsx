import React, { Component } from 'react';
import Transaction from './Transaction/Transaction';
import store from 'simple-global-store';

export default class Homepage extends Component {
  render() {
    return (
        <div className="container">
          <h1 className="welcome card" id="WelcomeMessage">Hello, {store.data.name}</h1>
          <Transaction walletNumber={store.data.walletId} limitFetching={5} transactionSortValue={'desc'} transactionSortColumn={'date'}/>
        </div>
    );
  }
}
