<<<<<<< HEAD

import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 47c94e77a9b00cdbe0b23d8b4fbcdf35df2a0c67
import './style.css';

// user/match are objects of {name, ingredients list, ID}
// recipies is list of recipie objects
// chat is list of message objects – {name, message}
// onChat is callback function for when this client sends new chat
export default function Match({ user, match, recipies, chat, onChat }) {

    console.log(user, match);

    const [messageInput, setMessageInput] = useState('');

    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];

    return !match ? <h3>loading...</h3> :
            <>
            <h1 > Your Match is { match.name } </h1 >
            <p>Your and match have the following ingredients in commmon:</p>
            <p>{commonIngredients.join(', ')}</p>

            <div className="horizontal-scrolling-wrapper">
                {!recipies ? <h2> No recipe suggestion, go crazy with your match! </h2> : (
                        <>
                            <h2>Suggested Recipes</h2>
                            {recipies.map(recipie =>
                                <div className="recipe-card">
                                    <h3>{recipie["name"]}</h3>
                                    <h3>{recipie["ingredients"]}</h3>
                                    <h3>{recipie["instructions"]}</h3>
                                </div>)
                            }
                        </>
                )}
            </div>

            <div className="vertical-scrolling-wrapper">
                <h2>Say Hi and Start Cooking!</h2>
                {chat.map(message =>
                    <>
                        <p>Sender: {message["sender"]}</p>
                        <p>Message: {message["text"]}</p>
                    </>
                )}
            </div>

            <div className="message-box">
                <input type="text" placeholder="enter your message..."
                    value={messageInput}
                    onChange={evt => setMessageInput(evt.target.value)}
                />
                <br /><br />
                <button onClick={() => onChat(messageInput)}>Send</button>
            </div>
        </>
    
}
