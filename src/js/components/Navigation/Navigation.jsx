import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import store from 'simple-global-store';

class Navigation extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  _doLogout() {
    store.clear();
    this.props.history.push('/');
  }

  render() {
    if (!store.data.isLoggedIn) {
     return null;
    }
    if (store.data.isLoggedIn) {
      return (<nav className="container">
        <div className="card">
          <div className="nav flex-column nav-pills">
            <Link to={'/homepage'}>
              <a id="dashboard-link-home"
                 className={
                   `nav-link ${this.props.location.pathname === '/homepage' ? 'active' : ''}`
                 }
                 data-toggle="pill"
                 href="#v-pills-home"
                 aria-controls="v-pills-home"
                 aria-selected="true"
              > <i className="fas fa-home"></i> Home
              </a>
            </Link>
            <Link to={'/dashboard'}>
              <a id="dashboard-link-dashboard"
                 className={`nav-link ${this.props.location.pathname === '/dashboard' ? 'active'
                     : ''}`
                 }
                 data-toggle="pill"
                 href="#v-pills-dashboard"
                 aria-controls="v-pills-dashboard"
                 aria-selected="false"
              ><i className="fas fa-columns"></i>Dashboard
              </a>
            </Link>
            <Link to={'/transfer'}>
              <a className={`nav-link ${this.props.location.pathname === '/transfer' ? 'active'
                      : ''}`
                 }
                 data-toggle="pill"
                 href="#v-pills-transfer"
                 aria-controls="v-pills-transfer"
                 aria-selected="false"
              ><i className="fas fa-exchange-alt"></i>Transfer
              </a>
            </Link>
            <Link to={'/topUp'}>
              <a className={`nav-link ${this.props.location.pathname === '/topUp' ? 'active'
                      : ''}`
                 }
                 data-toggle="pill"
                 href="#v-pills-transaction"
                 aria-controls="v-pills-transaction"
                 aria-selected="false"
              ><i className="fas fa-arrow-alt-circle-up"></i>Top Up
              </a>
            </Link>
            <a className={'nav-link'}
               data-toggle="pill"
               href="#v-pills-transaction"
               aria-controls="v-pills-transaction"
               aria-selected="false"
               onClick={this._doLogout.bind(this)}
            ><i className="fas fa-sign-out-alt"></i>Logout
            </a>
          </div>
        </div>
      </nav>);
    }
  }
}

export default withRouter(Navigation);
