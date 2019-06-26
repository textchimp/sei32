
import React, { Component } from 'react';

class FAQ extends Component {

  render(){
    return (
      <div>
        <h1>Welcome to the FAQ</h1>
        <p>Got a question about this site? It will be answered here!</p>

        {
          this.props.match.params.id
          ?
          <p>You asked for FAQ #{ this.props.match.params.id }</p>
          :
          <p>Choose from the following FAQs:</p>
        }

      </div>
    );
  }

}

export default FAQ;
