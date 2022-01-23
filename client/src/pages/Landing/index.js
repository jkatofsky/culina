import React, { useState } from 'react';
import { apiCall } from '../../util';
import { useHistory } from 'react-router-dom';

import './style.css';
import spatula from './images/spatula.svg';
import landingAnimation from './images/landing-page-animation.mp4';
import scrollArrow from './images/scroll-arrow.svg';
import enterInfoImg from './images/easy_step_enter_info.svg';
import matchImg from './images/easy_step_match.svg';
import cookImg from './images/easy_step_cook.svg';

import  logo  from '../../logo';

export default function Landing({ onCreateUser }) {

    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [modalOpen, setModalState] = useState(false);
    var [animatedTextIndex, setAnimatedTextIndex] = useState(0);
    const animatedTextArray = [
        {food: 'mexican', color: 'red'}, 
        {food: 'indian', color: 'yellow'},
        {food: 'thai', color: 'green'},
        {food: 'together', color: 'purple'}
    ];

    const history = useHistory();

    const createUser = async () => {
        const response = await apiCall('/user/create',
            {
                name: nameInput,
                ingredients: ingredientsInput.toLowerCase().split(',')
                    .map(ingredient => ingredient.trim())
            })
        if (response) {
            delete Object.assign(response, {
                'id': response['_id']['$oid']
            })['_id'];
            onCreateUser(response)
            history.push('/match')
        }
    }

    return <>
        <div className='landing-page-greeting-section'>
            {/* greeting animation */}
            <div className='landing-page-greeting-animation-section'>
                <div className='landing-page-greeting-text-container'>
                    <div className='landing-page-greeting-text'>today, we're</div>
                    <div className='landing-page-greeting-line-wrapper'>
                        <div className='landing-page-greeting-text'>cooking</div>
                            <div className='landing-page-animated-text-wrapper animated' onAnimationIteration={() => setAnimatedTextIndex(animatedTextIndex = (animatedTextIndex+1)%4)}>
                                <div className={`landing-page-greeting-text ${animatedTextArray[animatedTextIndex].color}`}>{animatedTextArray[animatedTextIndex].food}</div>
                            </div>
                    </div>
                </div>
             
            </div>

            {/* Scroll down image */}
            <div className='landing-page-greeting-scroll-down-section'>
                <img id='scroll-down-img' src={scrollArrow}></img>
                <div className='three-steps-text'>Remote Collaborative Cooking in Three Easy Steps</div>
            </div>


            <div className='landing-page-easy-steps-section'>
                <div className='landing-page-easy-step step-1'>
                    <div className='easy-step-img-wrapper'>
                        <img id='enter-info-icon' src={enterInfoImg}></img>
                    </div>
                    <div className='easy-step-text-wrapper'>
                        <div className='easy-step-text title'><b>Sign Up</b></div>
                        <div className='easy-step-text'>Start off by entering some basic information about yourself. Don't worry, we don't store any of your data!</div>
                    </div>
                </div>
                <div className='landing-page-easy-step step-2'>
                    <div className='easy-step-img-wrapper'>
                        <img id='match-icon' src={matchImg}></img>
                    </div>
                    <div className='easy-step-text-wrapper'>
                        <div className='easy-step-text title'><b>Match</b></div>
                        <div className='easy-step-text'>Match with someone that has the same ingredients as you.</div>
                    </div>
                </div>
                <div className='landing-page-easy-step step-2'>
                    <div className='easy-step-img-wrapper'>
                        <img id='cook-icon' src={cookImg}></img>
                    </div>
                    <div className='easy-step-text-wrapper'>
                        <div className='easy-step-text title'><b>Cook!</b></div>
                        <div className='easy-step-text'>Choose a recipe based your combined inputs and get cooking together!</div>
                    </div>
                </div>
            </div>

            <div className='landing-page-get-started-section'>
                <button onClick={() => setModalState(true)} id='get-started-btn'>Start Cooking!</button>
            </div>

            {/* footer */}
            <div className='landing-page-footer'>              
                {logo}
            </div>

        </div>
        {modalOpen && 
        <div className='landing-page-user-info-modal'>

            <div className='modal-window-title'>
                ENTER YOUR NAME AND THE INGREDIENTS THAT YOU HAVE ACCESS TO
            </div>

            

            <input id='name-input' className='modal-input' type="text" placeholder="Enter name"
                    value={nameInput}
                onChange={evt => setNameInput(evt.target.value)} />
            <input id='ingredients-input' className='modal-input' type="text" placeholder="Enter ingredients (comma-separated)"
                    value={ingredientsInput}
                    onChange={evt => setIngredientsInput(evt.target.value)} />

            <button id='match-btn' onClick={createUser}>Match</button>
            <button id='close-modal' onClick={() => setModalState(false)}>Close</button>
        </div>
        }
    </>;
}