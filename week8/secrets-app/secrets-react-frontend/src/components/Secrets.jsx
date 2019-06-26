
import React, { Component } from 'react';
import axios from 'axios';

import SecretsForm from './SecretsForm';

const SECRETS_URL = 'http://10.1.4.113:3000/secrets';

class Secrets extends Component {

  constructor(){
    super();

    this.state = {
      secrets: []
    };

  }

  // This is a React 'component lifecycle method', which will be run
  // automatically by React when this component is actually rendered
  // to the DOM ( equivalent of Vue's created() )
  // Can also think of this like jQuery's $(document).ready() for
  // individual components
  componentDidMount(){
    this.fetchSecrets(); // load the secrets data from the Rails API

    // Polling: keep asking the server every N seconds if there
    // are any new secrets to show on the page
    window.setInterval( () => {
      this.fetchSecrets();
    }, 1000);

  }


  fetchSecrets(){

    // Load secrets from server
    axios.get( SECRETS_URL )
    .then( res => {
      // console.log( res );
      this.setState({ secrets: res.data })
    })
    .catch( console.warn );

  }

  saveSecret = (secret) => {
    console.log( 'Secrets.saveSecret(): secret = ', secret );

    axios.post( SECRETS_URL, {secret_text: secret} )
    .then( res => {
        console.log( res );

        // Direct mutation of state is not allowed!
        // this.state.secrets.push( res.data.secret );

        // We need to make a copy of the array from
        // state, change the copy, and then set
        // the copy back into state using setState()
        // const secrets = this.state.secrets.slice();
        // secrets.push( res.data.secret );

        // Using the spread operator '...' actually makes
        // a copy of the array, so this is equivalent:
        this.setState({
          secrets: [ res.data.secret, ...this.state.secrets ]
        });

    })
    .catch( console.warn );

  }


  render(){
    return (
        <div>
          <h1>Spill Yer Guts</h1>
          <h2>An app for sharing embarrassing secrets with the world.</h2>

          <SecretsForm onSecretSubmit={ this.saveSecret } />

          <hr />

          {
            this.state.secrets.length > 0
            ?
            this.state.secrets.map( secret => <p key={ secret.id }>{ secret.content }</p>)
            :
            <p>Loading secrets...</p>
          }


        </div>
    );
  }

}

export default Secrets;
