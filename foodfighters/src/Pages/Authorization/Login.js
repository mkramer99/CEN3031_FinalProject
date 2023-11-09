import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    function auth() {
        // if valid
        navigate('/Map')
    }
    return (
        <div>
            <header className="App-header">Login
            <button onClick={() => auth()}>Login</button>
            </header>
        </div>
    )
}
