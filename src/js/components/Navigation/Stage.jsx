import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AddPayee from '../../AddPayee';
import Dashboard from '../Dashboard';
import Homepage from '../Homepage';
import LoginForm from '../LoginForm';
import TopUp from '../TopUp/TopUp';
import Transfer from '../Transfer/Transfer';

export default class Stage extends Component {
  render() {
    return (
        <main>
          <Switch>
            <Route exact path='/' component={LoginForm}/>
            <Route exact path='/homepage' component={Homepage}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/transfer' component={Transfer}/>
            <Route exact path='/topUp' component={TopUp}/>
            <Route exact path='/addPayee' component={AddPayee}/>
          </Switch>
        </main>
    );
  }
}