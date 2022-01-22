import React, { useState } from 'react';
import { apiCall } from '../../util';
import { useHistory } from 'react-router-dom';

import './style.css';
import spatula from './images/spatula.svg';
import pot from './images/pot.svg';
import scrollArrow from './images/scroll-arrow.svg';
import enterInfoImg from './images/easy_step_enter_info.svg';
import matchImg from './images/easy_step_match.svg';
import cookImg from './images/easy_step_cook.svg';

export default function Landing({ onCreateUser }) {

    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [modalOpen, setModalState] = useState(false);
    var [animatedTextIndex, setAnimatedTextIndex] = useState(0);
    const animatedTextArray = [
        {food: 'mexican', color: 'red'}, 
        {food: 'indian', color: 'yellow'},
        {food: 'thai', color: 'green'},
        {food: 'together', color: 'purple'},
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
            {/* logo/brand */}
            <div className='landing-page-header'>
                <div className='landing-page-brand-wrapper'>
                    <div className='landing-page-brand-text'>cu</div>
                    <svg className='landing-page-brand-svg' width="19" height="79" viewBox="0 0 19 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_11_31)">
                        <path d="M1.2605 1.26038V19.0886C1.2605 21.5132 2.30825 23.6925 3.97525 25.1996C6.3231 27.322 7.62093 30.3692 7.62083 33.5343L7.62103 58.6972H11.3794L11.3793 33.5344C11.3793 30.3694 12.6771 27.3221 15.0249 25.1997C16.6921 23.6926 17.7397 21.5135 17.7397 19.0886L17.7399 1.26047L1.2605 1.26038Z" fill="#BDCED4"/>
                        <path d="M9.50024 77.4894C7.58408 77.4894 6.03082 75.9362 6.03082 74.02V58.697H12.9696V74.02C12.9694 75.9362 11.4162 77.4893 9.50024 77.4894Z" fill="#8C4F39"/>
                        <path d="M17.7398 0H1.26036C0.564427 9.23945e-05 0.000102661 0.564346 0 1.26036V19.0885C0 21.7683 1.14097 24.3361 3.13002 26.1343C5.18302 27.9902 6.36044 30.6873 6.36044 33.5343L6.36054 57.4368H6.03069C5.33476 57.4369 4.77043 58.0012 4.77033 58.6971V74.0201C4.77053 75.2834 5.26248 76.4711 6.15563 77.3643C7.04888 78.2575 8.23677 78.7496 9.50011 78.7496C10.7634 78.7496 11.9512 78.2577 12.8446 77.3644C13.7378 76.4711 14.2298 75.2834 14.2299 74.02V58.697C14.2298 58.3628 14.097 58.0423 13.8607 57.8058C13.6244 57.5695 13.3039 57.4369 12.9696 57.4368H12.6397V33.5341C12.6395 30.6871 13.8169 27.989 15.8701 26.1343C17.8591 24.3363 19.0002 21.768 19 19.0884V1.26019C19.0002 0.564345 18.436 9.23945e-05 17.7398 0ZM11.7094 59.9574L11.7093 74.0201C11.7093 74.6102 11.4794 75.1651 11.0622 75.5822C10.645 75.9994 10.0903 76.2294 9.50011 76.2293C8.90991 76.2293 8.35534 75.9994 7.93802 75.5822C7.52081 75.165 7.29095 74.6102 7.29095 74.0201L7.29105 59.9575L11.7094 59.9574ZM16.4796 19.0886C16.4795 21.0569 15.6406 22.9436 14.1799 24.2649C11.599 26.5978 10.1189 29.9763 10.1191 33.5345L10.119 57.4368H8.88116V33.5341C8.88116 29.9758 7.401 26.5971 4.82032 24.2644C3.35885 22.9434 2.52073 21.0567 2.52073 19.0884V2.52046L16.4796 2.52036V19.0886Z" fill="black"/>
                        <path d="M5.72411 10.7226C5.02818 10.7228 4.46395 11.287 4.46385 11.9829L4.46375 17.0445C4.46375 17.7405 5.02797 18.3048 5.72411 18.3048C6.07213 18.3047 6.3872 18.1638 6.6152 17.9357C6.84332 17.7076 6.98437 17.3925 6.98437 17.0446L6.98447 11.983C6.98447 11.287 6.42015 10.7226 5.72411 10.7226Z" fill="black"/>
                        <path d="M4.46409 6.44632L4.46399 7.41019C4.46399 8.10623 5.02801 8.67046 5.72425 8.67046C6.07237 8.67046 6.38744 8.5294 6.61545 8.30139C6.84345 8.07338 6.98451 7.75832 6.98461 7.4103L6.98471 6.44642C6.98471 5.75048 6.42059 5.18616 5.72445 5.18616C5.02831 5.18626 4.46409 5.75048 4.46409 6.44632Z" fill="black"/>
                        <path d="M13.276 18.3047C13.6241 18.3046 13.9391 18.1636 14.1671 17.9356C14.3952 17.7074 14.5363 17.3923 14.5363 17.0444L14.5364 6.44631C14.5364 5.75027 13.9722 5.18594 13.276 5.18594C12.5802 5.18605 12.0158 5.75027 12.0158 6.4462L12.0157 17.0444C12.0158 17.7404 12.58 18.3047 13.276 18.3047Z" fill="black"/>
                        <path d="M9.50021 18.3047C9.84823 18.3047 10.1633 18.1637 10.3913 17.9357C10.6193 17.7076 10.7605 17.3924 10.7605 17.0445V6.44631C10.7605 5.75027 10.1962 5.18605 9.50011 5.18594C8.80418 5.18605 8.23985 5.75027 8.23975 6.44631V17.0445C8.23985 17.7405 8.80418 18.3047 9.50021 18.3047Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_31">
                        <rect width="19" height="79" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className='landing-page-brand-text right'>ina.</div>
                </div>
            </div>

            {/* greeting animation */}
            <div className='landing-page-greeting-animation-section'>
                <div className='landing-page-greeting-text-container'>
                    <div className='landing-page-greeting-text'>Today, we're</div>
                    <div className='landing-page-greeting-line-wrapper'>
                        <div className='landing-page-greeting-text'>cooking</div>
                            <div className='landing-page-animated-text-wrapper animated' onAnimationIteration={() => setAnimatedTextIndex(animatedTextIndex = (animatedTextIndex+1)%4)}>
                                <div className={`landing-page-greeting-text ${animatedTextArray[animatedTextIndex].color}`}>{animatedTextArray[animatedTextIndex].food}</div>
                            </div>
                    </div>
                </div>
                <img id='pot-svg' className='pot-svg' src={pot}></img>
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
                        <div className='easy-step-text'>Start off by entering some basic information about yourslef. Don't worry, we don't store any of your data!</div>
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
                <div className='landing-page-brand-wrapper'>
                    <div className='landing-page-brand-text'>cu</div>
                    <svg className='landing-page-brand-svg' width="19" height="79" viewBox="0 0 19 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_11_31)">
                        <path d="M1.2605 1.26038V19.0886C1.2605 21.5132 2.30825 23.6925 3.97525 25.1996C6.3231 27.322 7.62093 30.3692 7.62083 33.5343L7.62103 58.6972H11.3794L11.3793 33.5344C11.3793 30.3694 12.6771 27.3221 15.0249 25.1997C16.6921 23.6926 17.7397 21.5135 17.7397 19.0886L17.7399 1.26047L1.2605 1.26038Z" fill="#BDCED4"/>
                        <path d="M9.50024 77.4894C7.58408 77.4894 6.03082 75.9362 6.03082 74.02V58.697H12.9696V74.02C12.9694 75.9362 11.4162 77.4893 9.50024 77.4894Z" fill="#8C4F39"/>
                        <path d="M17.7398 0H1.26036C0.564427 9.23945e-05 0.000102661 0.564346 0 1.26036V19.0885C0 21.7683 1.14097 24.3361 3.13002 26.1343C5.18302 27.9902 6.36044 30.6873 6.36044 33.5343L6.36054 57.4368H6.03069C5.33476 57.4369 4.77043 58.0012 4.77033 58.6971V74.0201C4.77053 75.2834 5.26248 76.4711 6.15563 77.3643C7.04888 78.2575 8.23677 78.7496 9.50011 78.7496C10.7634 78.7496 11.9512 78.2577 12.8446 77.3644C13.7378 76.4711 14.2298 75.2834 14.2299 74.02V58.697C14.2298 58.3628 14.097 58.0423 13.8607 57.8058C13.6244 57.5695 13.3039 57.4369 12.9696 57.4368H12.6397V33.5341C12.6395 30.6871 13.8169 27.989 15.8701 26.1343C17.8591 24.3363 19.0002 21.768 19 19.0884V1.26019C19.0002 0.564345 18.436 9.23945e-05 17.7398 0ZM11.7094 59.9574L11.7093 74.0201C11.7093 74.6102 11.4794 75.1651 11.0622 75.5822C10.645 75.9994 10.0903 76.2294 9.50011 76.2293C8.90991 76.2293 8.35534 75.9994 7.93802 75.5822C7.52081 75.165 7.29095 74.6102 7.29095 74.0201L7.29105 59.9575L11.7094 59.9574ZM16.4796 19.0886C16.4795 21.0569 15.6406 22.9436 14.1799 24.2649C11.599 26.5978 10.1189 29.9763 10.1191 33.5345L10.119 57.4368H8.88116V33.5341C8.88116 29.9758 7.401 26.5971 4.82032 24.2644C3.35885 22.9434 2.52073 21.0567 2.52073 19.0884V2.52046L16.4796 2.52036V19.0886Z" fill="black"/>
                        <path d="M5.72411 10.7226C5.02818 10.7228 4.46395 11.287 4.46385 11.9829L4.46375 17.0445C4.46375 17.7405 5.02797 18.3048 5.72411 18.3048C6.07213 18.3047 6.3872 18.1638 6.6152 17.9357C6.84332 17.7076 6.98437 17.3925 6.98437 17.0446L6.98447 11.983C6.98447 11.287 6.42015 10.7226 5.72411 10.7226Z" fill="black"/>
                        <path d="M4.46409 6.44632L4.46399 7.41019C4.46399 8.10623 5.02801 8.67046 5.72425 8.67046C6.07237 8.67046 6.38744 8.5294 6.61545 8.30139C6.84345 8.07338 6.98451 7.75832 6.98461 7.4103L6.98471 6.44642C6.98471 5.75048 6.42059 5.18616 5.72445 5.18616C5.02831 5.18626 4.46409 5.75048 4.46409 6.44632Z" fill="black"/>
                        <path d="M13.276 18.3047C13.6241 18.3046 13.9391 18.1636 14.1671 17.9356C14.3952 17.7074 14.5363 17.3923 14.5363 17.0444L14.5364 6.44631C14.5364 5.75027 13.9722 5.18594 13.276 5.18594C12.5802 5.18605 12.0158 5.75027 12.0158 6.4462L12.0157 17.0444C12.0158 17.7404 12.58 18.3047 13.276 18.3047Z" fill="black"/>
                        <path d="M9.50021 18.3047C9.84823 18.3047 10.1633 18.1637 10.3913 17.9357C10.6193 17.7076 10.7605 17.3924 10.7605 17.0445V6.44631C10.7605 5.75027 10.1962 5.18605 9.50011 5.18594C8.80418 5.18605 8.23985 5.75027 8.23975 6.44631V17.0445C8.23985 17.7405 8.80418 18.3047 9.50021 18.3047Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_31">
                        <rect width="19" height="79" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className='landing-page-brand-text right'>ina.</div>
                </div>
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