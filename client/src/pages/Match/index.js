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
    const hasRecipes = (recipies.length != 0)

    return !match ? <h3>loading...</h3> :
            <>
            <h1 > Your Match is { match.name } </h1 >
            <p>Your and match have the following ingredients in commmon:</p>
            <p>{commonIngredients.join(', ')}</p>

            //recipe suggestion
            <div className="horizontal-scrolling-wrapper">
                    {hasRecipes ? (
                            <h2> No recipe suggestion, go crazy with your match! </h2>
                      ) : (
                                <h2>Suggested Recipes</h2>
                                {recipies.map(recipie =>
                                    <div className="recipe-card">
                                        <h3>{recipie["name"]}</h3>
                                        <h3>{recipie["ingredients"]}</h3>
                                        <h3>{recipie["instructions"]}</h3>
                                    </div>)
                                }
                            )
                       }
            </div>

            //chat display box
            <div className="vertical-scrolling-wrapper">
                <h2>Say Hi and Start Cooking!</h2>
                {chat["messages"].map(message =>
                    <p>Sender: {message["sender"]}</p>
                    <p>Message: {message["text"]}</p>
                }
            </div>

            //chat enter text box
            <div className="message-box">
              <input type="text" placeholder="enter your message..." <br><br>
              <input type="submit" value="SEND" onChat DO????>
            </div>



        </>
    
}