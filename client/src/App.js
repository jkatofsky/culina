import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { socket } from './util';
import Landing from './pages/Landing';
import Match from './pages/Match';

import './App.css';

function App() {

    const [user, setUser] = useState(null);
    const [match, setMatch] = useState(null);
    const [recipies, setRecipies] = useState([]);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("match", (matchObj) => {
            setMatch(JSON.parse(matchObj.match))
            setRecipies(matchObj.recipies)
        });
        socket.on("messaged", (messageObj) => {
            setChat(chat => [...chat, messageObj]);
        });
    })

    const onCreateUser = (user) => {
        setUser(user);
        socket.emit('search-for-match', user.id);
    }

    const onSendMessage = (message) => {
        setChat(chat => [...chat, { sender: user.name, message }]);
        socket.emit('message', user.id, message);
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
                        onSendMessage={onSendMessage} />
                </Route>
        </Switch>
    </Router>;
}

export default App;
