import React from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterBusiness() {
    const navigate = useNavigate();
    function auth() {
        // if all fields filled and no duplicate email
        navigate('/Map')
    }

    return (
        <div>
            <header className="App-header">Register Business
            <button onClick={() => auth()}>Submit</button>
            </header>
        </div>
    )
}
