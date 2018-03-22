import axios from 'axios';
import md5 from 'md5';
import React, { Component } from 'react';
import store from 'simple-global-store';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorUsername: '',
      errorPassword: '',
      errorInvalid: '',
    };
    this._handleInputUsername = this._handleInputUsername.bind(this);
    this._handleInputPassword = this._handleInputPassword.bind(this);
    this._handleInputOnSubmit = this._handleInputOnSubmit.bind(this);
    this._doLogin = this._doLogin.bind(this);
  }

  _handleInputUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  _handleInputPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  _handleInputOnSubmit(event) {
    event.preventDefault();
    let valid = true;
    const { username, password } = this.state;
    if (username === '') {
      valid = false;
      this.setState({
        errorUsername: 'username require',
      });
    }

    if (password === '') {
      valid = false;
      this.setState({
        errorPassword: 'password require',
      });
    }
    if (username === '' && password === '') {
      valid = false;
      this.setState({
        errorInvalid: 'username and password is required',
      });
    }

    if (valid) {
      this._doLogin();
    }
  }

  _doLogin() {
    const { username, password } = this.state;
    axios.post('http://localhost:3000/loginhehe', {
      username: username,
      password: md5(password),
    }).then((response) => {
      store.update({
        userId: response.data.data.id,
        walletId: response.data.data.walletId,
        name: response.data.data.name,
        isLoggedIn: true,
      });
      this.props.history.push('/homepage');
    }).catch((e) => {
      console.log(e);
      this.setState({
        errorInvalid: e.response.data.message,
      });
    });
  }

  render() {
    const { username, password } = this.state;
    return (
        <section className="section-form">
          <div className="container justify-content-center">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <form>
                <div className="avatar">
                  <i className="fas fa-user fa-5x"></i>
                </div>
                <div className="row justify-content-md-center">
                  <div className="form-group">
                    <label htmlFor="ErrorUsername">{this.state.errorUsername}</label>
                    <input type="text" className="username form-control"
                           onChange={this._handleInputUsername}
                           value={username} placeholder="Username" />
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <div className="form-group">
                    <label htmlFor="ErrorPassword">{this.state.errorPassword}</label>
                    <input type="password" className="password form-control"
                           onChange={this._handleInputPassword}
                           value={password} placeholder="Password" />
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <button className="submit btn btn-primary"
                          onClick={this._handleInputOnSubmit}>Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </section>
    );
  }
}