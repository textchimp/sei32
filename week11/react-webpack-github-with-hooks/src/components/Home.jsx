
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Functional component
export default function Home( props ){

  const _randomUser = () => {

    const usernames = [
      'textchimp',
      'hluscombe',
      'david-wade',
      'parryjos1',
      'amandachau36',
      'viola-hu',
      'claraykim'
    ];

    const randomIndex = Math.floor( Math.random() * usernames.length );
    const randomUser = usernames[ randomIndex ];

    props.history.push(`/profile/${ randomUser }`);
  };

  return (
    <div className="Home">
      <h1>GitHub Search</h1>
      <hr/>


     <Link to="/search">
       <button>Search for a User</button>
     </Link>

     &nbsp;

      <button onClick={ _randomUser }>Random User</button>

    </div>
  );
};

// export default class Home extends Component {
// export default Home;
