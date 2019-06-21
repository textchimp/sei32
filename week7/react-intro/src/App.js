import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HelloWorld from './HelloWorld';
import HelloUser from './HelloUser';

class App extends Component {

  // Every component class must define a render() method,
  // which returns some JSX (HTML)
  render(){

    return (
      <div>
        <h1>App component</h1>
        <HelloWorld />

        <HelloUser name="Viola" imgWidth="300" imgHeight="200"/>

        <HelloUser name="Amanda" imgWidth="400" imgHeight="200"/>

        <img src="http://placebear.com/200/200"/>
      </div>
    );

  } // render()

} // class App

// const App = function() {
//   // A component function must return some JSX (HTML tags inside JS)
//   return (
//     <div className="fun">
//       <p>Hello World from React!</p>
//       <p>Thanks for visiting!</p>
//       <img src="http://fillmurray.com/300/300" />
//      </div>
//    );
//
//   // return <p>Hello World from React</p>;
//   // return React.createElement('p', null, 'Hello World from React!');
//
// };

export default App;
