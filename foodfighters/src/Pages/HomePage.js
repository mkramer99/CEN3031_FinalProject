import React from 'react';
import NavBar from '../Navbar';

function HomePage() {
    return (
        <div>
            { <NavBar/>  } 
                    <div class="main">
                    <div class="main_container">
                        <div class="main_content">
                        <h1>Welcome to The Food Fighters' Donation Connector!</h1>
                        <p>We aim to increase availability of food and personal items to individuals in need.</p>
                        </div>
                    </div>
                    </div>
        </div>
    );
}
export default HomePage;