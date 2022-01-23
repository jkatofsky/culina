import React, { useState } from 'react';
import './style.css';
import './loading-styles.css'

export default function Match({ user, match, recipes, chat, onSendMessage }) {

    const [messageInput, setMessageInput] = useState('');

    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];

    return !match ? <div className='loading-animation-container'>
                <div className='loading-messages-container'>
                    <span className="text">Finding some yummy recipes and great company!</span>
                        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox="0 0 1440 320">
                            <path d="M0,256L48,218.7C96,181,192,107,288,90.7C384,75,480,117,576,165.3C672,213,768,267,864,261.3C960,256,1056,192,1152,176C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox="0 0 1440 320">
                            <path d="M0,256L48,261.3C96,267,192,277,288,256C384,235,480,181,576,160C672,139,768,149,864,144C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    <span className="progress-bar"></span>
                </div>
            </div>
        : <>
            <div className="heading">
                <h1>Your match is <span>{match.name}</span>!</h1>
                <small>You have the following ingredients in commmon:</small>
                <h2><i>{commonIngredients.join(', ')}</i></h2>
            </div>

            <div className='content'>
                <div className="recipes">
                    {!recipes ?
                        <p> We were unable to find a recipe suggestion based on your mutual ingredients; we still encourage you to use the chat (and your imagination) to plan something delicious!</p> : <>
                        {/* TODO: turn the recipes into accordions */}
                        {/* TODO: turn the ingredients and instructions into bulleted lists – should be easy because they are lists alread I think */}
                            <h2>Suggested Recipes</h2>
                            {recipes.map(recipe =>
                                <div className="recipe-card">
                                    <h3>{recipe.name}</h3>
                                    <h3>{recipe.ingredients}</h3>
                                    <h3>{recipe.instructions}</h3>
                                </div>)
                            }
                        </>
                    }
                </div>

                <div className="chat">
                    <h2>Chat with eachother and choose a recipe!</h2>
                    <div className="messages-wrapper">
                        {chat.map(message =>
                            <div className={message.sender === user.name ? 'user-message' : 'match-message'}>
                                <p>
                                    <small> <b>{message.sender}</b></small><br/>
                                    {message.message}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='input-wrapper'>
                        <input type="text" placeholder="Enter your message..."
                            className='message-input'
                            value={messageInput}
                            onChange={evt => setMessageInput(evt.target.value)}
                        />
                        <button
                            id='send-message-btn'
                            onClick={() => {
                                if (!messageInput) return;
                                onSendMessage(messageInput);
                                setMessageInput('');
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    
}
