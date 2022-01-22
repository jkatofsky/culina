import React from 'react';
import './style.css';

// user/match are objects of {name, ingredients list, ID}
// recipies is list of recipie objects
// chat is list of message objects – {name, message}
// onChat is callback function for when this client sends new chat
export default function Match({ user, match, recipies, chat, onChat }) {
    console.log(user, match);
    const commonIngredients = match ? user.ingredients
        .filter(ingredient => match.ingredients.includes(ingredient)) : [];
    
    return !match ? <h3>loading...</h3> :
            <>
            <h1 > Your Match is { match.name } </h1 >
            <p>Your and match have the following ingredients in commmon:</p>
            <p>{commonIngredients.join(', ')}</p>
            <div className="scrolling-wrapper">
                <h2>Suggested Recipes</h2>
                {recipies.map(recipie =>
                    <div className="card">
                        <h3>{recipie["name"]}</h3>
                        <h3>{recipie["ingredients"]}</h3>
                        <h3>{recipie["instructions"]}</h3>
                    </div>)
                }
            </div>
        </>
    
}