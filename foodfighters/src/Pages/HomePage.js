import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <header className="Form-Header">
                Food Fighters
                <div className='Form'>
                    <button onClick={() => navigate('/Login')}>Login</button>
                    <button onClick={() => navigate('/RegisterBusiness')}>Register A Business</button>
                    <button onClick={() => navigate('/Register')}>Register A User</button>
                    <button onClick={() => navigate('/Map')}>Map</button>
                </div>
            </header>
        </div>
    );
}
export default HomePage;