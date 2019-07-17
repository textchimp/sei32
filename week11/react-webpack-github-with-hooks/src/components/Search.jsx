import React, { Component, useState } from 'react';

export default function Search( props ){

  // Hooks!  (⚡️ 🔥 SO HOT RIGHT NOW 🔥 ⚡️)
  // Retrieve a getter and setter for a single state variable from useState()
  // - The getter is a variable containing the current value
  // - The setter is a function we can use to change the value
  // - The argument to useState() is the initial value for the state variable
  // i.e., it's like:
  // this.state = {
  //   username: ''
  // };
  const [username, setUsername] = useState('');

  // const arr = [ 0, 1 ];
  // const [a, b] = arr;
  // a will contain 1
  // b will contain 2
  //
  // Don't write this, dear lord:
  // const usernameHooksArray = useState('');
  // const username = usernameHooksArray[ 0 ];
  // const setUsername = usernameHooksArray[ 1 ];

  const _handleChange = (event) => {
    setUsername( event.target.value );
    // instead of:
    // this.setState({ username: event.target.value });
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    props.history.push(`/profile/${ username }`);
  };

  return (
    <div className="search">
      <h2>Search GitHub by Username</h2>
      <hr />
      <form onSubmit={ _handleSubmit }>
        <input type="text" placeholder="Username" onChange={ _handleChange }  />
        &nbsp;
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}


// WE NO LONGER NEED THIS:
// Left here for reference
class SearchOldEmbarrassingWeb1point0 extends Component {

  constructor( props ){
    super( props );

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
