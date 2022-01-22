import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { io } from "socket.io-client";

import { SERVER_URL } from './util';
import Landing from './pages/Landing';
import Match from './pages/Match';

import './App.css';

function App() {

    const [user, setUser] = useState({});
    const [match, setMatch] = useState({});
    const [recipies, setRecipies] = useState([]);
    const [chat, setChat] = useState([]);

    // TODO: figure out why I can't get the socket object in the state or a static variable for use outside this function
    // will be a problem for the chat feature
    const onCreateUser = (user) => {
        setUser(user);
        // console.log(user);
        const socket = io(SERVER_URL, { transports: ['websocket'] });
        socket.on('connect',
            () => socket.emit('search-for-match', user.id))
        socket.on("match", (matchObj) => {
            onMatch(matchObj.match, matchObj.recipies);
        });
    }

    const onMatch = (match, recipies) => {
        setMatch(match)
        setRecipies(recipies)
    }

    const onChat = (message) => {
        setChat(chat => [...chat, message]);
        // TODO: emit chatting event to match
    }

    return <Router>
            <Switch>
                <Route exact path="/">
                    <Landing onCreateUser={onCreateUser} />
                </Route>
                <Route path="/match">
                    <Match user={user}
                        match={match}
                        recipies={recipies}
                        chat={chat}
                        onChat={onChat} />
                </Route>
        </Switch>
    </Router>;
}

export default App;
