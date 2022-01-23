import React, { useState } from 'react';
import './style.css';
import './loading-styles.css'
import { Redirect } from 'react-router-dom';

import landingAnimation from './images/landing-page-animation.mp4';

export default function Match({ user, match, recipes, chat, onSendMessage }) {

    const [messageInput, setMessageInput] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');

    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];

    return !user ? <Redirect to='/'/> :
        (!match ? <div className='loading-animation-container'>
            <video id='pot-svg' width='300px' autoPlay muted loop>
                <source src={landingAnimation} type="video/mp4"></source>
            </video>

            <div className='loading-messages-container'>
                <span className="text">Hold tight while we find your cooking buddy!</span>
                <span className="progress-bar"></span>
            </div>
        </div>
            :
            <>
                <div className="heading">
                    <h1>Your match is &nbsp;<span>{match.name}</span>!</h1>
                   
                    <h2>
                        <small>You have the following ingredients in commmon:</small>
                        <i>{commonIngredients.join(', ')}</i></h2>
                </div>

                <div className='content'>
                    <div>
                        <h2>Matching recipes</h2>
                        <div className='recipes-container'>
                            {!recipes ?
                                <p> We were unable to find a recipe suggestion based on your mutual ingredients; we still encourage you to use the chat (and your imagination) to plan something delicious!</p> :
                                <>
                                    {recipes.map((recipe, index) =>
                                        <div key={index}>
                                            <div className='recipe-title-container'>
                                                <img className='recipe-title-img' src={recipe.image}></img>
                                                <div className='recipe-title-and-button'>
                                                    <div className='recipe-title'>{recipe.name}</div>
                                                    <div className='recipe-title-expand'
                                                        onClick={() => selectedRecipe === recipe.name ? setSelectedRecipe('') : setSelectedRecipe(recipe.name)}>{selectedRecipe === recipe.name ? '-' : '+'}</div>
                                                </div>
                                            </div>
                                            <div className={`recipe-details ${selectedRecipe === recipe.name ? 'visible' : 'hidden'}`}>

                                                <div className='recipe-ingredients'>
                                                    {recipe.ingredients.map(ingr =>
                                                        <div className='ingredient'>{ingr}</div>
                                                    )}

                                                </div>

                                                {recipe.instructions.map((instr, index) =>
                                                    <div key={index}>
                                                        <div className='instruction-container'>
                                                            <div className='instruction-index'>{index + 1}</div>
                                                            <div className='instruction'>{instr}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </div>

                    <div className="chat">
                        <h2>Chat with eachother and choose a recipe!</h2>
                        <div className='chat-wrapper'>
                            <div className="messages-wrapper">
                                {chat.map(message => {
                                    const me = message.sender === user.name;
                                    return <div className={me ? 'user-message' : 'match-message'}>
                                        <p>
                                            <small> <b>{me ? 'Me' : message.sender}</b></small><br />
                                            {message.message}
                                        </p>
                                    </div>
                                }
                                )}
                            </div>
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
            </>)
}
