import React from 'react';
import './style.css';

// user/match are objects of {name, ingredients list, ID}
// recipies is list of recipie objects (format not finalized)
// chat is list of message objects (format not finalized)
// onChat is callback function for when this client sends new chat
export default function Match({ user, match, recipies, chat, onChat }) {
    // TODO: if !match, render loading state


    // tried my best ;-; web dev is so hard eueueue
    //rec = {
    //"name": #str; example: "Noodles With Eggplants and Mushrooms"
    // "ingredients": #list of str, each string = ingredient + its quantity
    // "instructions": #list of str, each string = step in cooking the dish
    // } We can have up to 3 such recs

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