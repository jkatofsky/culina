import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useBeforeunload } from 'react-beforeunload';


import { socket } from './util';
import Landing from './pages/Landing';
import Match from './pages/Match';
import logo from './logo';
import './App.css';

function App() {

    const [user, setUser] = useState(null);
    const [match, setMatch] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [chat, setChat] = useState([]);

    const onCreateUser = (user) => {
        setUser(user);

        socket.emit('search-for-match', user.id);

        socket.on("match", (matchObj) => {
            setMatch(JSON.parse(matchObj.match))
            setRecipes(matchObj.recipes)
        });
        socket.on("messaged", (messageObj) => {
            setChat(chat => [...chat, messageObj]);
        });
        socket.on("match-left", () => {
            setRecipes([]);
            setMatch(null);
            setChat([]);
        })
    }

    useBeforeunload(() => {
        socket.disconnect()
    });

    const onSendMessage = (message) => {
        setChat(chat => [...chat, { sender: user.name, message }]);
        socket.emit('message', user.id, message);
    }

    return <>
        <div className='app-logo'>{logo}</div>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Landing onCreateUser={onCreateUser} />
                </Route>
                <Route path="/match" onLeave={() => socket.disconnect()}>
                    <Match user={user}
                        match={match}
                        recipes={recipes}
                        chat={chat}
                        onSendMessage={onSendMessage} />
                </Route>
        </Switch>
    </Router>
    </>;
}

export default App;
