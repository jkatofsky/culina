import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Landing from './pages/Landing';
import Search from './pages/Search';
import Match from './pages/Match';

import './App.css';

function App() {
  return <Router>
      <Switch>
    {/* click button and create user with id before redirecting */}
      <Route exact path="/">
          <Landing />
      </Route>
      {/* when user loads this page, event emitted that they are searching */}
      <Route path="/search/:id">
          <Search />
      </Route>
      {/* renders each id if they are matched with the other */}
      <Route path="/match/:id1/:id2">
          <Match />
      </Route>
  </Switch>
</Router>;
}

export default App;
