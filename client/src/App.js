import React, { useState } from 'react';
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

    const [user, setUser] = useState({});
    const [partner, setPartner] = useState({});
    const [recipies, setRecipies] = useState([]);

    return <Router>
            <Switch>
                {/* click button and create user with id before redirecting */}
                <Route exact path="/">
                    <Landing onCreateUser={(user) => setUser(user)}/>
                </Route>
                {/* when user loads this page, event emitted that they are searching */}
                <Route path="/search">
                    <Search />
                </Route>
                {/* renders each id if they are matched with the other */}
                <Route path="/match">
                    <Match />
                </Route>
        </Switch>
    </Router>;
}

export default App;
