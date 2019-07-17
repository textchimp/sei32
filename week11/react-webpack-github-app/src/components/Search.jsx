import React, { Component } from 'react';

export default class Search extends Component {

  constructor( props ){
    super( props );
    console.log('this, inside constructor(): ', this);
    this.state = {
      username: ''
    };
  }

  _handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault(); // don't submit/reload the page
    this.props.history.push(`/profile/${ this.state.username }`);
  }

  render(){
    return (
      <div className="search">
        <h2>Search GitHub by Username</h2>
        <hr />
        <form onSubmit={ this._handleSubmit }>
          <input type="text" placeholder="Username" onChange={ this._handleChange }  />
          &nbsp;
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }

}
