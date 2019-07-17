import React, { Component, useState, useEffect } from 'react';
import ajax from '../lib/ajax';

import './Profile.css';


export default function Profile( props ){

  // this.state = {
  //   user: null,
  //   repos: null
  // };
  const [userDetails, setUserDetails] = useState( null );
  const [repos, setRepos] = useState( null );

  // componentDidMount(){
  // }
  useEffect(() => {

    const { username } = props.match.params;

    ajax.getUserInfo( username )
    .then( res => setUserDetails(res.data) )
    .catch( console.warn );

    ajax.getUserRepos( username )
    .then( res => setRepos(res.data) )
    .catch( console.warn );

  }, [] ); // empty array as second arg means: only run once, on component mount

  // componentDidUpdate(prevProps, prevState){
  //   console.log('updated!', {prevProps, prevState});
  //   if( this.props.match.params.username !== prevProps.match.params.username ){
  //     console.log('Username has changed!');
  //     console.log(`Old value: ${prevProps.match.params.username}`);
  //     console.log(`New value: ${this.props.match.params.username}`);
  //   }
  // }
  useEffect(() => {
    console.log('Username has changed:', props.match.params.username);
  }, [props.match.params.username] );

  useEffect(() => {
    console.log('repos and userDetails have changed: ', repos, userDetails);
  }, [repos, userDetails]);


  return (
    <div className="profile">
      <h1>Profile for { props.match.params.username }</h1>
      <div>
        <UserInfo user={ userDetails }/>
        <UserRepos repos={ repos }/>
      </div>
    </div>
  );
}


// JUST FOR REFERENCE:
class ProfileThatYourGrandpaMadeYuckSoOld extends Component {

  constructor( props ){
    // 'super()' here calls the constructor() method of the parent class Component,
    // and passes the arguments our own component's constructor received (props)
    // to that parent version of constructor
    // In this way our component can both a) define its own version of constructor(),
    // to do custom setup work, and b) still get access to the behaviour defined in
    // the parent's version of constructor(), which does important things such as
    // setting up the correct value of 'this'.
    //
    // The Component class is "closed for modification, but open for extension":
    // if we want to customise the Component class, we don't go and change its
    // source code directly; instead we create a derived class or child class
    // which inherits everything from Component, but can customise any of that
    // behaviour, by redefining any of its methods.
    super(props);

    this.state = {
      user: null,
      repos: null
    };

  } // constructor()

  // React component 'lifecycle method': methods with certain special names
  // will be called automatically at certain times in a component's life:
  // componentDidMount(), componentDidUpdate(prevProps, prevState)
  componentDidMount(){
    console.log('mounted!');

    // Ruby: synchronous (blocking) request
    // res = HTTParty.get( URL )
    // puts res

    const { username } = this.props.match.params;
    // ^ Object property desctructuring (ES6), same as writing:
    // const username = this.props.match.params.username;

    ajax.getUserInfo( username )
    .then( res => this.setState({ user: res.data }) )
    .catch( console.warn );

    ajax.getUserRepos( username )
    .then( res => this.setState({ repos: res.data }) )
    .catch( console.warn );

  }

  // Vue.js:
  // data: {
  //   message: 'Starting value'
  // },
  // watch: {
  //   message(oldVal){
  //     console.log('this.message has changed:', this.message, oldVal);
  //   }
  // }

  componentDidUpdate(prevProps, prevState){
    console.log('updated!', {prevProps, prevState});
    if( this.props.match.params.username !== prevProps.match.params.username ){
      console.log('Username has changed!');
      console.log(`Old value: ${prevProps.match.params.username}`);
      console.log(`New value: ${this.props.match.params.username}`);
    }
  }

  componentWillUnmount(){
    // clean up any open connections, unsubscribe from notifications, etc...
    console.log('unmounted');
  }


  render(){

    return (
      <div className="profile">
        <h1>Profile for { this.props.match.params.username }</h1>
        <div>
          <UserInfo user={ this.state.user }/>
          <UserRepos repos={ this.state.repos }/>
        </div>
      </div>
    );
  }

} // class Profile


const UserInfo = (props) => {

  let infoContent;

  if( props.user === null ){
    infoContent = <div>Loading user info...</div>;
  } else {
    const { followers, following, public_repos, public_gists, html_url, avatar_url } = props.user;
    // const followers = this.state.user.followers;
    // const following = this.state.user.following;
    infoContent = (
      <div>
        <img src={ avatar_url } width="100" />
        <p>Followers: { followers }</p>
        <p>Following: { following }</p>
        <p>Repos: { public_repos }</p>
        <p>Gists: { public_gists }</p>
        <p>
          <a href={ html_url } target="_blank">View on GitHub</a>
        </p>
      </div>
    );
  }


  return (
    <div className="userInfo">
      <h3>Stats</h3>
      { infoContent }
    </div>
  );
};


const UserRepos = (props) => {

  let reposList;

  if( props.repos === null ){
    reposList = <div>Loading user repos...</div>;
  } else {
    reposList = props.repos.map( repo => (
      <li key={ repo.name }>
        <a href={ repo.html_url } target="_blank">{ repo.name }</a>
      </li>
    ));
  }

  return (
    <div className="reposInfo">
      <h3>Repos</h3>
        <ul className="reposList">
        { reposList }
        </ul>
    </div>
  );
};
