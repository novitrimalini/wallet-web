import React from 'react';
import PropTypes from 'prop-types';

export default class Sort extends React.Component {

  _onSubmitHighest() {
    const data = {
      sortMethod: 'DESC'
    };

    this.props.onClick(data);
  }

  _onSubmitLowest(){
    const data = {
      sortMethod: 'ASC'
    };

    this.props.onClick(data);
  }

  render() {
    return (
        <div className="btn-group btn-group-toggle" role="group" aria-label="sort">
          <button type="button" className="button-sort--lowest btn btn-secondary"
                  onClick={this._onSubmitLowest.bind(this)}>Lowest
          </button>
          <button type="button" className="button-sort--highest btn btn-secondary"
                  onClick={this._onSubmitHighest.bind(this)}>Highest
          </button>
        </div>
    );
  }
}

Sort.propTypes = {
  onClick: PropTypes.func.isRequired,
};

