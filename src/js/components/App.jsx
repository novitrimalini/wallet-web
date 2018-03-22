import React, { Component } from 'react';
import { link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../styles/App.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Stage from './Navigation/Stage';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className={'row'}>
            <div className="container-fluid">
              <Header />
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-3 align-self-top'}>
              <Navigation />
            </div>
            <div className={'col-9'}>
              <Stage />
            </div>
          </div>
          <div className={'row'}>
            <div className="container-fluid">
              <Footer />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
