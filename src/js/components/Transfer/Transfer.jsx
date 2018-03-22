import axios from 'axios/index';
import moment from 'moment';
import React, { Component } from 'react';
import store from 'simple-global-store';
import Payeelist from './Payeelist';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {
        walletId: store.data.walletId,
      },
      to: '',
      amount: '',
      description: '',
      errorAmount: '',
      errorDescription: '',
      payeeList: [],
      message: '',
      name: store.data.name,
    };
    this._handleAmount = this._handleAmount.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAddPayee = this._handleAddPayee.bind(this);
  }

  _handleAmount(event) {
    this.setState({
      amount: event.target.value,
      message: '',
    });
  }

  _handleDescription(event) {
    this.setState({
      description: event.target.value,
      message: '',
    });
  }

  _callback(wallet) {
    this.setState({
      to: {
        walletId: wallet,
      },
      message: '',
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const { from, to, amount, description } = this.state;
    let valid = true;
    if (amount === '') {
      valid = false;
      this.setState({
        message: 'Amount is require',
      });
    }

    if (amount !== '' && Number(amount) <= 0) {
      valid = false;
      this.setState({
        message: 'Invalid amount',
      });
    }

    if (to !== '' && valid) {
      axios.post(`http://localhost:3000/wallets/${from.walletId}/transactions`, {
        date: moment().format(),
        amount: amount,
        description: description,
        toWalletID: to.walletId,
        fromWalletID: from.walletId,
      }).then((response) => {
        this.setState({
          message: 'Success',
          amount: '',
          description: '',
        });
      }).catch((e) => {
        this.setState({
          message: e.response.data.message,
        });
      });
    }
  }

  _getPayee() {
    axios.get(`http://localhost:3000/users/${store.data.userId}/payees`).then((payeesResponse) => {
      const payeesList = payeesResponse.data;
      return Promise.all([
        payeesList,
        axios.get(`http://localhost:3000/users/${payeesList[ 0 ].id}/wallets`),
      ]);
    }).then(([ payeesList, walletsResponse ]) => {
      const to = {
        walletId: walletsResponse.data.id,
      };
      this.setState({
        payeeList: payeesList,
        to: to,
      });
    }).catch((err) => {
      this.setState({
        payeeList: [],
      });
    });
  }

  componentDidMount() {
    this._getPayee();
  }

  _handleAddPayee() {
    this.props.history.push('/addPayee');
  }

  render() {
    return (
        <div className="container">
          <form>
            <div className="card border-primary mb-3 align-content-lg-left">
              <div className="card-header">
                <div className={'row'}>
                  <div className="col-10 transfer">Transfer</div>
                  <div className="col add-payee justify-content-end">
                    <button className={'submit-add-payee btn btn-secondary'}
                            onClick={this._handleAddPayee}><i className="fas fa-user-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              {this.state.message !== '' ? <span>{this.state.message}</span> : null}
              <div className="row form-padding">
                <div className="col text-left space-left-title">
                  <label htmlFor="from">From:</label>
                </div>
                <div className="col-8 text-left space-left-title">
                  <span className="from">{this.state.name}</span>
                </div>
              </div>
              <div className="row form-padding">
                <div className="col text-left space-left-title">
                  <label htmlFor="To">To:</label>
                </div>
                <div className="col-8">
                  {this.state.payeeList.length === 0 ?
                      <span>You don't have payee. Please add Payee first.</span>
                      : <Payeelist payeelisting={this.state.payeeList}
                                   callbackFunction={this._callback.bind(this)} />
                  }
                </div>
              </div>
              <div className="row form-padding">
                <div className="col text-left space-left-title">
                  <label htmlFor="amount">Amount: </label>
                </div>
                <div className="col-8">
                  <input type="number" min="0" className="amount form-control "
                         onChange={this._handleAmount} value={this.state.amount} />
                </div>
              </div>
              <div className="row form-padding">
                <div className="col text-left space-left-title">
                  <label htmlFor="description">Description :</label>
                </div>
                <div className="col-8">
                  <textarea className="description form-control"
                            onChange={this._handleDescription} value={this.state.description} />
                </div>
              </div>
              <div className="row form-padding">
                <div className="col-6 text-right">
                  <button type="submit" className="submit-send btn btn-secondary"
                          onClick={this._handleSubmit}> Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
};