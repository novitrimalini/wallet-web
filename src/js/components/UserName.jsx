import React, { Component } from 'react';
import store from 'simple-global-store';

export default class UserName extends Component {
  render() {
    return (
        <div id={'username'} className="Name">
          <h1 className="card">Hello, {store.data.name}</h1>
        </div>
    );
  }
}
