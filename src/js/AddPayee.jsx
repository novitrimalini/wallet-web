import axios from 'axios';
import React, { Component } from 'react';
import store from 'simple-global-store';

export default class AddPayee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: '',
      message: '',
      username: '',
      usernamePayee: '',
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._onClickButtonSearch = this._onClickButtonSearch.bind(this);
    this._onClickButtonAdd = this._onClickButtonAdd.bind(this);
  }

  _onChangeText(event) {
    this.setState({
      username: event.target.value,
      message: '',
    });
  }

  _onClickButtonSearch() {
    let valid = true;
    this.setState({
      payee: '',
      message: '',
    });
    if (this.state.username === '') {
      valid = false;
      this.setState({
        message: 'Username Payee required',
      });
    }
    if (valid) {
      const { username } = this.state;
      axios.get(`http://localhost:3000/users?username=${username}`).then((response) => {
        this.setState({
          payee: response.data,
          usernamePayee: response.data.username,
        });
      }).catch((e) => {
        this.setState({
          message: e.response.data.message,
        });
      });
    }
  }

  _onClickButtonAdd() {
    axios.post(`http://localhost:3000/users/${store.data.userId}/payees`, {
      username: this.state.usernamePayee,
    }).then((response) => {
      this.setState({
        message: 'Success',
      });
    }).catch((e) => {
      this.setState({
        message: e.response.data.message,
      });
    });
  };

  render() {
    const { payee, username, message } = this.state;
    return (
        <div className={'container'}>
          <section>
            <div className="card">
              <div className="card-header">Add Payee</div>
              <div className="card-body text-primary">
                <p>{message}</p>
                <input type="text" id="username" className={'form-control'}
                       onChange={this._onChangeText}
                       value={username} />
                <button type="submit" id="searchPayee" className="submit btn btn-primary"
                        onClick={this._onClickButtonSearch}> Search
                </button>
                {payee !== '' ? <div>
                  <p className="payee">{payee.name}</p>
                  <button type="submit" id="addPayee" className="btn payeeExist submit"
                          onClick={this._onClickButtonAdd}>Add
                  </button>
                </div> : null
                }
              </div>
            </div>
          </section>
        </div>
    );
  }

}