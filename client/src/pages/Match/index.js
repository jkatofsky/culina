import React, { useState } from 'react';
import './style.css';

export default function Match({ user, match, recipies, chat, onSendMessage }) {

    const [messageInput, setMessageInput] = useState('');

    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];

    return !match ? <h3>loading...</h3> :
        <>
            <div className="heading">
                <h1> your match is {match.name}!</h1 >
                <small>You have the following ingredients in commmon:</small>
                <h3>{commonIngredients.join(', ')}</h3>
            </div>

            <div className='content'>
                <div className="recipies">
                    {!recipies ?
                        <p> We were unable to find a recipie suggestion based on your mutual ingredients; we still encourage you to use the chat (and your imagination) to plan something delicious!</p> : <>
                        {/* TODO: turn the recipies into accordions */}
                        {/* TODO: turn the ingredients and instructions into bulleted lists – should be easy because they are lists alread I think */}
                            <h2>Suggested Recipes</h2>
                            {recipies.map(recipie =>
                                <div className="recipe-card">
                                    <h3>{recipie.name}</h3>
                                    <h3>{recipie.ingredients}</h3>
                                    <h3>{recipie.instructions}</h3>
                                </div>)
                            }
                        </>
                    }
                </div>

                <div className="chat">
                    <div className="vertical-scrolling-wrapper">
                        <h2>Say hi and plan your cooking!</h2>
                        {chat.map(message =>
                                <p><b>{message.sender}</b> {message.message}</p>
                        )}
                    </div>
                    <div>
                        <input type="text" placeholder="enter your message..."
                            value={messageInput}
                            onChange={evt => setMessageInput(evt.target.value)}
                        />
                        <br /><br />
                        <button onClick={() => {
                            onSendMessage(messageInput);
                            setMessageInput('');
                        }}>Send</button>
                    </div>
                </div>
            </div>
        </>
    
}
