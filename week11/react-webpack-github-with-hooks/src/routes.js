
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

console.log('Route component:', Route );

import Home from './components/Home';
import Search from './components/Search';
import Profile from './components/Profile';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/search" component={ Search } />
      <Route exact path="/profile/:username" component={ Profile } />
    </div>
  </Router>
);

export default Routes;
