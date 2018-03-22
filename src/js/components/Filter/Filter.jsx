import React from 'react';
import FilterAmount from './FilterAmount';
import FilterQuery from './FilterQuery';

export default class Filter extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
    };
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(query) {
    this.setState({
      query: query,
    });
  }

  render() {
    return (
        <div className='query-form'>
          <div className='row'>
            <div className='col'>
              <FilterQuery onChange={this.updateQuery} value={this.state.query}/>
            </div>
            <div className='col'>
              <FilterAmount/>
            </div>
          </div>
        </div>
    );
  }
}