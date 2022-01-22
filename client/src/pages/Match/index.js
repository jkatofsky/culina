import React from 'react';

// user/partner are objects of {name, ingredients list, ID}
// recipies is list of recipie objects (format not finalized)
// chat is list of message objects (format not finalized)
// onChat is callback function for when this client sends new chat
export default function Match({user, partner, recipies, chat, onChat}) {

    return <>
    
    {partner ? <div className="wrapper">
        <header>
            <h1> Your match: </h1>
            <img alt="Match" title="Match!" width="200" height="200"></img> 
            <ul>
            <li>Name: </li>
            <li>Role: </li>
            <li>Pronouns: </li>
            <li>Ingredients list: </li>
            </ul>
            </header>
            <hr></hr>
        <section id="two_column" className="clearfix">
            <h2> Your recipes: </h2>


                <div>
            <div>RECIPE 1</div>
            <img alt="Best Recipe" title="Recipe" width="100%"></img>
            </div>

            <div>
            <div>RECIPE 2</div>
            <div className="img1"><img alt="Second best recipe" title="Recipe" width="100%"></img></div>
            <br></br>
                <div>RECIPE 3</div>
            <div className="img2"><img alt="Third best recipe" title="Recipe" width="100%"></img></div>
            </div>

        </section>



        <footer>
            &copy; Culina
        </footer>
        </div>
    : 
    <div></div>
    }
    
    
    </>;
}
