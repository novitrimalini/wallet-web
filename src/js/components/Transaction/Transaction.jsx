import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TransactionDesktop from './TransactionDesktop';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionCollection: [],
    };
  }

  componentDidMount() {
    let url = `http://localhost:3000/wallets/${this.props.walletNumber}/transactions?`;

    if (this.props.limitFetching !== undefined) {
      url += `&size=${this.props.limitFetching}`;
    }

    if(this.props.transactionSortColumn !== null){
      url+= `&orderBy=${this.props.transactionSortColumn}`;
      url+= `&order=${this.props.transactionSortValue}`;
    }

    axios.get(url).then((response) => {
      this.setState({
        transactionCollection: response.data,
      });
    });
  }

  componentWillReceiveProps(nextProps){
    let url = `http://localhost:3000/wallets/${this.props.walletNumber}/transactions?`;

    if (nextProps.limitFetching !== undefined) {
      url += `&size=${nextProps.limitFetching}`;
    }

    if (nextProps.transactionFilterColumn !== null) {
      url +=`&filterBy=${nextProps.transactionFilterColumn}`;
      if(nextProps.transactionFilterColumn === 'amount'){
        url +=`&filterMode=${nextProps.transactionFilterMode}`;
      }
      url +=`&filterValue=${nextProps.transactionFilterValue}`;
    }

    if(nextProps.transactionSortColumn !== null){
      url+= `&orderBy=${nextProps.transactionSortColumn}`;
      url+= `&order=${nextProps.transactionSortValue}`;
    }

    axios.get(url).then((response) => {
      this.setState({
        transactionCollection: response.data,
      });
    });
  }

  render() {
    return (
        <div>
          <TransactionDesktop transactionCollection={this.state.transactionCollection}
                              transactionWalletId={this.props.walletNumber}/>
        </div>
    );
  }
}
Transaction.defaultProps = {
  transactionFilterValue: null,
  transactionFilterColumn: null,
  transactionFilterMode: null,
  transactionSortValue: null,
  transactionSortColumn: null,
};
Transaction.propTypes = {
  walletNumber: PropTypes.number.required,
  limitFetching: PropTypes.number,
  transactionFilterValue: PropTypes.string,
  transactionFilterMode: PropTypes.string,
  transactionFilterColumn: PropTypes.string,
  transactionSortValue: PropTypes.string,
  transactionSortColumn: PropTypes.string,
};
