
import React, { Component } from 'react';

class Clickr extends Component {

  // If your component has props,
  // they must be passed as an argument to
  // the constructor
  constructor( props ){
    super( props ); // call Component.constructor(props)

    this.state = {
      clickCounter: 0
    };

    // this.incrementClicks = this.incrementClicks.bind(this);
  }

  incrementClicks = () => {
    // this.state.clickCounter += 1; // NOOOO!!!!!!!
    const newClickCount = this.state.clickCounter + 1;

    this.setState({
      clickCounter: newClickCount
    });

    console.log('Running this.props.onButtonClick()');

    this.props.onButtonClick( newClickCount );


    // This will not print the updated value, because
    // setState() is asynchronous - it takes some time
    // to do its job, and the console.log code is run
    // before it's finished.
    // console.log(this.state.clickCounter);
  }


  render(){
    return (
      <button onClick={ this.incrementClicks }>
        { this.props.message }
        ({ this.state.clickCounter })
      </button>
    );
  }

}

export default Clickr;
