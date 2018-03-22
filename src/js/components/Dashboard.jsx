import React, { Component } from 'react';
import Filter from './Filter/Filter';
import FilterAmount from './Filter/FilterAmount';
import FilterQuery from './Filter/FilterQuery';
import Sort from './Sort';
import Transaction from './Transaction/Transaction';
import UserBalance from './UserBalance';
import UserName from './UserName';
import store from 'simple-global-store';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterColumn: null,
      filterMode: null,
      filterValue: null,
      sortColumn: 'date',
      sortValue: 'desc',
      query: '',
    };
  }

  onUpdateFilterValue(data) {
    this.setState({
      filterValue: data.amount,
      filterColumn: 'amount',
      filterMode: data.filterAmountMethod,
    });
  };

  onSubmitFilterDesc(query) {
    this.setState({
      filterColumn: 'description',
      filterMode: null,
      filterValue: query,
      query: query,
    });
  }

  render() {
    return (
        <div className={'container'}>
          <div className={'card'}>
          <span className={'dashboard-user__title '} id="WelcomeMessage">
            <UserName/>
          </span>
            <section>
              <label className="balance">Your Balance</label>
              <UserBalance/>
            </section>
          </div>
          <div className={'row filter-wrap'}>
            <div className={'col'}>
              <FilterQuery onChange={this.onSubmitFilterDesc.bind(this)} value={this.state.query} />
            </div>
            <div className={'col'}>
              <FilterAmount onClick={this.onUpdateFilterValue.bind(this)} />
            </div>
          </div>
          <Transaction walletNumber={store.data.walletId}
                       transactionFilterColumn={this.state.filterColumn}
                       transactionFilterMode={this.state.filterMode}
                       transactionFilterValue={this.state.filterValue}
                       transactionSortColumn={this.state.sortColumn}
                       transactionSortValue={this.state.sortValue}
          />
        </div>
    );
  }
}