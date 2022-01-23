import React, { useState } from 'react';
import './style.css';
import './loading-styles.css'

import landingAnimation from './images/landing-page-animation.mp4';

export default function Match({ user, match, recipes, chat, onSendMessage }) {


    recipes = [{
        "name": "German Pancakes (From the Mennonite Treasury of Recipes) 1",
        "ingredients": [
            "1 1/2  cups    flour",
            "1/2  teaspoon    salt",
            "3       eggs",
            "1 3/4  cups    milk"
        ],
        "instructions": [
            "Mix all together with a mixer or by hand until free of lumps.",
            "Spray frying pan with \"Pam\" and heat over high heat until hot.",
            "Reduce heat and pour approx 1/3 cup of batter in center and tilt to cover entire bottom of pan.",
            "When small bubbles form and bottom begins to brown, flip and cook other side.",
            "We like to eat these sprinkled with sugar and rolled up."
        ],
        "image": "https://tse4.mm.bing.net/th?id=OIP.urjf91jzYt4Ivk3Ll6dVGAAAAA&pid=Api"
    },
    {
        "name": "German Pancakes (From the Mennonite Treasury of Recipes) 2",
        "ingredients": [
            "1 1/2  cups    flour",
            "1/2  teaspoon    salt",
            "3       eggs",
            "1 3/4  cups    milk"
        ],
        "instructions": [
            "Mix all together with a mixer or by hand until free of lumps.",
            "Spray frying pan with \"Pam\" and heat over high heat until hot.",
            "Reduce heat and pour approx 1/3 cup of batter in center and tilt to cover entire bottom of pan.",
            "When small bubbles form and bottom begins to brown, flip and cook other side.",
            "We like to eat these sprinkled with sugar and rolled up."
        ],
        "image": "https://tse4.mm.bing.net/th?id=OIP.urjf91jzYt4Ivk3Ll6dVGAAAAA&pid=Api"
    },
    {
        "name": "German Pancakes (From the Mennonite Treasury of Recipes) 3",
        "ingredients": [
            "1 1/2  cups    flour",
            "1/2  teaspoon    salt",
            "3       eggs",
            "1 3/4  cups    milk"
        ],
        "instructions": [
            "Mix all together with a mixer or by hand until free of lumps.",
            "Spray frying pan with \"Pam\" and heat over high heat until hot.",
            "Reduce heat and pour approx 1/3 cup of batter in center and tilt to cover entire bottom of pan.",
            "When small bubbles form and bottom begins to brown, flip and cook other side.",
            "We like to eat these sprinkled with sugar and rolled up."
        ],
        "image": "https://tse4.mm.bing.net/th?id=OIP.urjf91jzYt4Ivk3Ll6dVGAAAAA&pid=Api"
    },
    {
        "name": "German Pancakes (From the Mennonite Treasury of Recipes) 4",
        "ingredients": [
            "1 1/2  cups    flour",
            "1/2  teaspoon    salt",
            "3       eggs",
            "1 3/4  cups    milk"
        ],
        "instructions": [
            "Mix all together with a mixer or by hand until free of lumps.",
            "Spray frying pan with \"Pam\" and heat over high heat until hot.",
            "Reduce heat and pour approx 1/3 cup of batter in center and tilt to cover entire bottom of pan.",
            "When small bubbles form and bottom begins to brown, flip and cook other side.",
            "We like to eat these sprinkled with sugar and rolled up."
        ],
        "image": "https://tse4.mm.bing.net/th?id=OIP.urjf91jzYt4Ivk3Ll6dVGAAAAA&pid=Api"
    }];


    const [messageInput, setMessageInput] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');

    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];

    return !match ? <>

        <div className='recipes-container'>
            {recipes.map((recipe, index) => 
            <div key={index}>
                <div className='recipe-title-container'>
                    <img className='recipe-title-img' src={recipe.image}></img>
                    <div className='recipe-title'>{recipe.name}</div>
                    <div className='recipe-title-expand'
                         onClick={() => selectedRecipe === recipe.name ?  setSelectedRecipe('') : setSelectedRecipe(recipe.name)}>{selectedRecipe === recipe.name ? '-' : '+'}</div>
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
                                <div className='instruction-index'>{index+1}</div>
                                <div className='instruction'>{instr}</div>
                            </div>
                        </div>
                    )}
                </div>  
            </div>
            )}
        </div>


    <div className='loading-animation-container'>

        <video id='pot-svg' width='300px' autoPlay muted loop>
            <source src={landingAnimation} type="video/mp4"></source>
        </video>

        <div className='loading-messages-container'>
            <span className="text">Hold tight while we find your cooking buddy!</span>
            <span className="progress-bar"></span>
        </div>
    </div>
    
    
    </> :
        <>
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
