import React, { Component } from 'react';
import './App.css';

import Calculator from './Calculator';

class App extends Component {

  render(){
    return (
      <div className="calculatorApp">
      <Calculator />
      </div>
    );
  }

}

export default App;
