
import React, { Component } from 'react';

import Clickr from './Clickr';

class HistoryEraser extends Component {

  constructor(){
    super();

    this.state = {
      historyStillExists: true
    };

  }

  maybeEraseHistory = ( clickCount ) => {
    console.log('HistoryEraser.maybeEraseHistory(): Button was clicked! clickCount = ', clickCount);

    if( clickCount > 4 ){
      this.setState({ historyStillExists: false });
    }

  }


  render(){

    return (
      <div>
        <h1>HISTORY ERASER BUTTON!!!!!</h1>

        {
          this.state.historyStillExists
          ?
          <h3>All is well - history still exists.</h3>
          :
          <h2>YOU FOOL!!! YOU ERASED HISTORY!!!$%@!</h2>
        }

        <Clickr
          message="Possibly Erase History"
          onButtonClick={ this.maybeEraseHistory }
        />

      </div>
    );
  }

}

export default HistoryEraser;
