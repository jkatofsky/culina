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

    return <>
    <h1>Your Match is {{ user.name }} </h1>
    <p> Your match has the following ingredients: </p>
    <p> {{ match.ingredients }} </p>
    <div class="scrolling-wrapper")
        <h2> Suggested Recipes </h2>
        <div class = "card">
            <h3> {{recipies[0]["name"]}} </h3>
            <h3> {{recipies[0]["ingredients"]}} </h3> //I don't know if it'll print list nicely?
            <h3> {{recipies[0]["instructions"]}} </h3>
        </div>

        <div class = "card"> </div>
            <h3> {{recipies[1]["name"]}} </h3>
        </div>

        <div class = "card">
            <h3> {{recipies[2]["name"]}} </h3>
        </div>

    </div>
    </>
}