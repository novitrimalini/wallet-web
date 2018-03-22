import React from 'react';
import PropTypes from 'prop-types';

export default class FilterQuery extends React.Component {
  _onChangeQuery(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return (
        <div>
          <input className="filter-query--input form-control"
                 onChange={this._onChangeQuery.bind(this)}
                 value={value}
                 placeholder="search ..."
          />
        </div>
    );
  }
}

FilterQuery.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};