import React, { Component } from 'react';

export default class TransferForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      from: 'Budi',
      to: '',
      amount: '',
      description: '',
      errorInvalid: ''
    };
    this._handleAmount = this._handleAmount.bind(this);
    this._handleDescription = this._handleDescription.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleAmount(event){
    this.setState({
      amount: event.target.value,
    })
  }
  _handleDescription(event){
    this.setState({
      description: event.target.value,
    })
  }

  _handleSubmit(){
    const { from, to, amount, description} = this.state;
    const data = {
      from: from,
      to: to,
      amount: amount,
      description: description,
    };
    if (from === '' || to === '' || amount === '' || description === '') {
      this.setState({
        errorInvalid: 'Please fill empty field',
      });
    }
    this.props.onSubmit(data);
  }

  render() {
    return (
        <form>
          <div className="card border-primary mb-3 col-4 align-content-lg-center">
            <div className="card-header">Transfer</div>
            <div className="card-body text-primary">
              <div class="row">
                <div class="col">
                  <label htmlFor="from">From:</label>
                </div>
                <div class="col-8">
                  <span className="from">Budi</span>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <label htmlFor="To">To:</label>
                </div>
                <div class="col-8">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button"
                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="true">
                      Receiver
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="wwww.google.com">Doni</a>
                      <a class="dropdown-item" href="#">Dono</a>
                      <a class="dropdown-item" href="#">Dona</a>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <label htmlFor="amount">Amount: </label>
                </div>
                <div class="col-8">
                  <input type="text" className="amount" onChange={this._handleAmount} />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <label htmlFor="description">Description :</label>
                </div>
                <div class="col-8">
                  <textarea className="description" onChange={this._handleDescription} />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <button type="submit" className="submit btn btn-secondary"
                          onClick={this._handleSubmit}> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
    );
  }
}
