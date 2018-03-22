import axios from 'axios';
import React, { Component } from 'react';

export default class Payeelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this._onChangeCombo = this._onChangeCombo.bind(this);
  }

  _onChangeCombo(event) {
    this.setState({
      value: event.target.value,
    });
    axios.get(`http://localhost:3000/users/${event.target.value}/wallets`).then((response) => {
      this.props.callbackFunction(response.data.id);
    }).catch((e) => {

    });
  }

  render() {
    return (
        <select id="comboPayee" className="form-control" value={this.state.value} onChange={this._onChangeCombo}>
          {this.props.payeelisting.map((payee, index) => {
            return <option key={index} value={payee.id}>{payee.name}</option>;
          })}
        </select>
    );
  }
}





