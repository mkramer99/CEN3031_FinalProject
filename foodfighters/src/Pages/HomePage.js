import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <header className="App-header">
            Food Fighters
            <button onClick={() => navigate('/Login')}>Login</button>
            <button onClick={() => navigate('/RegisterBusiness')}>Register A Business</button>
            <button onClick={() => navigate('/Register')}>Register A User</button>
            </header>
        </div>
    );
}
export default HomePage;