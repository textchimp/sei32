import React, { Component } from 'react';

class SearchForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      queryText: ''
    };

  }

  handleInput = (event) => {
    // console.log( event.target.value );
    this.setState({ queryText: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault(); // stop form from reloading whole page

    console.log('SearchForm.handleSubmit(): submitted!');

    // Call the callback function passed from
    // the parent as a prop, and give as an
    // argument the contents of the text input
    this.props.onFormSubmit( this.state.queryText );

  }

  render(){
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.handleInput }/>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }

}

export default SearchForm;
