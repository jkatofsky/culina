import React from 'react';

// user/partner are objects of {name, ingredients list, ID}
// recipies is list of recipie objects (format not finalized)
// chat is list of message objects (format not finalized)
// onChat is callback function for when this client sends new chat
export default function Match({ user, partner, recipies, chat, onChat }) {
    // TODO: if !partner, render loading state
    return <h1>match</h1>;
}