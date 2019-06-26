
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {

  constructor(){
    super();

    this.state = {
      faqLinks: [
        { id: 5,   text: 'Where am I?'},
        { id: 20,  text: 'How do I donate to this amazing site?'},
        { id: 101, text: 'Will Microsoft destroy GitHub?'},
      ]
    };

  }

  gotoFAQs = () => {
    // console.log('clicked!', this);
    this.props.history.push('/faq'); // go to this route!
  }

  render(){
    return (
      <div className="home">
        <h1>This is the Home Page</h1>

        <p>Check out the <Link to="/faq">Frequently Asked Questions</Link> page if you have any questions</p>

        <button onClick={ this.gotoFAQs }>
          Go to the FAQs
        </button>


        <h3>Common FAQs</h3>

        <ul>
        {
          this.state.faqLinks.map( faq => (
            <li key={faq.id}>
              <Link to={`/faq/${faq.id}`}>{ faq.text }</Link>
            </li>
          ))
         }
        </ul>

      </div>
    );
  }

}

export default Home;
