import React from 'react';
import PropTypes from 'prop-types';

export default class FilterAmount extends React.Component {
  constructor() {
    super();

    this.state = {
      amount: '',
    };
  }

  _onChangeInput(event) {
    this.setState({
      amount: event.target.value,
    });
  }

  _onSubmitLesser() {
    const data = {
      filterAmountMethod: 'lesser',
      amount: this.state.amount,
    };
    this.props.onClick(data);
  }

  _onSubmitGreater() {
    const data = {
      filterAmountMethod: 'greater',
      amount: this.state.amount,
    };
    this.props.onClick(data);
  }

  render() {
    const { amount } = this.state;

    return (
        <div>
          <div className="row">
            <div className="col">
              <input className="filter-query--amount form-control"
                     onChange={this._onChangeInput.bind(this)}
                     value={amount}
                     placeholder={'amount'}
              />
            </div>
            <div className="col btn-group btn-group-toggle" role="group" aria-label="Basic example">
              <button type="button" className="submit-payee button-amount--lesser btn btn-secondary"
                      onClick={this._onSubmitLesser.bind(this)}>Lesser
              </button>
              <button type="button" className="submit-payee button-amount--greater btn btn-secondary"
                      onClick={this._onSubmitGreater.bind(this)}>Greater
              </button>
            </div>
          </div>
        </div>
    );
  }
}

FilterAmount.propTypes = {
  onClick: PropTypes.func.isRequired,
};