
import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import Home from './Home';
import FAQ from './FAQ';

const Routes = (
  <Router>
    <div>
      { /*  Map a URL route to a component, i.e. show that component when the route is visited in the browser  */ }
      <Route exact path="/"        component={ Home }  />
      <Route exact path="/faq"      component={ FAQ }  />
      <Route exact path="/faq/:id"  component={ FAQ }  />
    </div>
  </Router>
);

export default Routes;
