import React, { Component } from 'react';
import logo from './Image/LogoMakr_1t867m.png';

export default class Header extends Component{

  render(){
    return(

          <div className="header text-center">
            <div className="row">
              <div className="col">
                <img src={logo} alt="Logo" className="img-circle" />
              </div>
            </div>
          </div>
    );
  }
}