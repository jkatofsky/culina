import React, { useState } from 'react';
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
    const [recipes, setRecipes] = useState([]);
    const [chat, setChat] = useState([]);

    const onCreateUser = (user) => {
        setUser(user);

        socket.emit('search-for-match', user.id);

        socket.once("match", (matchObj) => {
            setMatch(JSON.parse(matchObj.match))
            setRecipes(matchObj.recipes)
        });
        socket.on("messaged", (messageObj) => {
            setChat(chat => [...chat, messageObj]);
        });
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
                        recipes={recipes}
                        chat={chat}
                        onSendMessage={onSendMessage} />
                </Route>
        </Switch>
    </Router>;
}

export default App;
