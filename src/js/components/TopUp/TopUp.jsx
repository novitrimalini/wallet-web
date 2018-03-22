import axios from 'axios';
import React, { Component } from 'react';
import store from 'simple-global-store';

export default class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      message: '',
    };
    this._handleAmountTopUp = this._handleAmountTopUp.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleAmountTopUp(event) {
    this.setState({
      amount: event.target.value,
      message: '',
    });
  }

  _handleSubmit() {
    const { amount } = this.state;
    let valid = true;
    if (amount === '') {
      valid = false;
      this.setState({
        message: 'Amount Required',
      });
    }

    if (amount !== '' && Number(amount) <= 0) {
      valid = false;
      this.setState({
        message: 'Invalid Amount',
      });
    }

    if (valid) {
      axios.post(`http://localhost:3000/users/${store.data.userId}/wallets`, {
        amount: Number(amount),
      }).then((response) => {
        this.setState({
          message: 'Success',
          amount: '',
        });
      }).catch((e) => {
        this.setState({
          message: e.response.data.message,
        });
      });
    }
  }

  render() {
    const { amount, message } = this.state;
    return (
        <div className={'container'}>
          <div className="card border-primary mb-3 align-content-lg-center">
            <div className="card-header">Top Up Wallet</div>
            <div className="card-body text-primary">
              <div className="row">
                <div className="col">
                  {message !== '' ? <p>{message}</p> : <p></p>}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="number" id="amount" className={'form-control'} onChange={this._handleAmountTopUp}
                         placeholder="ex:50000"
                         value={amount} />
                </div>
              </div>
              <button type="submit" id="submit" className="submit btn btn-secondary" onClick={this._handleSubmit}>Top
                Up
              </button>
            </div>
          </div>
        </div>
    );
  }
}