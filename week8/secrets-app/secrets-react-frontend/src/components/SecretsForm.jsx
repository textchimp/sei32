
import React, { Component } from 'react';

class SecretsForm extends Component {

  constructor( props ){
    super( props );

    this.state = {
      secret: '',
      errorMessage: ''
    };

  }

  handleChange = (event) => {

    if( event.target.value.length > 0 ){
      // Clear the error message
      this.setState({ errorMessage: '' });
    }

    this.setState({ secret: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Send the secret text to the parent component
    // (Secrets) as an argument to the callback
    // which was passed to us as a prop

    if( this.state.secret.length > 0 ){
      this.props.onSecretSubmit( this.state.secret );
    } else {
      // Set the error message if the form was submitted
      // with an empty input
      this.setState({ errorMessage: 'Please enter a secret.' });
    }

  }

  render(){
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Spill here" onChange={ this.handleChange } />
          <input type="submit" value="Share" />
        </form>
        <div style={{color: 'red'}}>
          { this.state.errorMessage }
        </div>
      </div>
    );
  }

}

export default SecretsForm;
