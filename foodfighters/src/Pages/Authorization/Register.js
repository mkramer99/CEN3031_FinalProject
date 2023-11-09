import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();
    function auth() {
        // if all fields filled and no duplicate email
        navigate('/Map')
    }
    function form() {
        return (
            <div>
                <header className="App-header">Form</header>
            </div>
        )
    }
    return (
        <div>
            <header className="App-header">Register
            {form}
            <button onClick={() => auth()}>Submit</button>
            </header>
        </div>
    )
}

