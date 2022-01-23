import React, { useState } from 'react';
import './style.css';
import './loading-styles.css'

import landingAnimation from './images/landing-page-animation.mp4';

export default function Match({ user, match, recipies, chat, onSendMessage }) {


    recipies = [{
        "name": "German Pancakes (From the Mennonite Treasury of Recipes)",
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
        "name": "German Pancakes (From the Mennonite Treasury of Recipes)",
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
        "name": "German Pancakes (From the Mennonite Treasury of Recipes)",
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
        "name": "German Pancakes (From the Mennonite Treasury of Recipes)",
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
            {recipies.map((recipe, index) => 
            <div key={index}>
                <div className='recipe-title-container'>
                    <img className='recipe-title-img' src={recipe.image}></img>
                    <div className='recipe-title'>{recipe.name}</div>
                    <div className='recipe-title-expand'
                         onClick={() => selectedRecipe === recipe.name ?  setSelectedRecipe('') : setSelectedRecipe(recipe.name)}>{selectedRecipe === recipe.name ? '-' : '+'}</div>
                </div>

                <div className={`recipe-details ${selectedRecipe === recipe.name ? 'visible' : 'hidden'}`}>
                    <div>my recipe</div>
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
