import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { io } from "socket.io-client";

import { SERVER_URL } from './util';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Match from './pages/Match';

import './App.css';

function App() {

    const [user, setUser] = useState({});
    const [partner, setPartner] = useState({});
    const [recipies, setRecipies] = useState([]);
    const [chat, setChat] = useState([]);

    const history = useHistory();

    useEffect(() => {
        this.socket = io(SERVER_URL, { transports: ['websocket'] });
        // TODO: define handlers for recieved event(s?)
        // will call onMatch at the least
    });

    const onCreateUser = (user) => {
        setUser(user);
        // TODO: emit searching event
        history.push('/search');
    }

    const onMatch = (partner, recipies) => {
        setPartner(partner)
        setRecipies(recipies)
        history.push('/match')
    }

    const onChat = (message) => {
        setChat(chat => [...chat, message]);
        // TODO: emit chatting event to partner
    }

    return <Router>
            <Switch>
                {/* click button and create user with id before redirecting */}
                <Route exact path="/">
                    <Landing onCreateUser={onCreateUser}/>
                </Route>
                {/* when user loads this page, event emitted that they are searching */}
                <Route path="/search">
                    <Search />
                </Route>
                {/* renders each id if they are matched with the other */}
                <Route path="/match">
                <Match user={user}
                    partner={partner}
                    recipies={recipies}
                    chat={chat}
                    onChat={onChat} />
                </Route>
        </Switch>
    </Router>;
}

export default App;
