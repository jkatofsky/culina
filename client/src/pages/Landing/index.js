import React, { useState } from 'react';
import { apiCall } from '../../util';

export default function Landing({ onCreateUser }) {

    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');

    const createUser = async () => {
        const response = await apiCall('/user/create',
            { name: nameInput, ingredients: ingredientsInput.split(',') })
        if (response) onCreateUser(response)
        
    }

    return <>
        <h1>landing</h1>
        <input type="text" placeholder="Enter name"
                value={nameInput}
            onChange={evt => setNameInput(evt.target.value)} />
        <input type="text" placeholder="Enter ingredients (comma-separated)"
                value={ingredientsInput}
                onChange={evt => setIngredientsInput(evt.target.value)} />
        <button onClick={createUser}>Start searching</button>
    </>;
}