import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import user from './User';
import 'reactjs-popup/dist/index.css';

export function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();
    // handling the submit button action
    async function handleSubmit(event) {
        event.preventDefault();
        // api call to check if account exists
        async function fetchBusinessAccount() {
            const newUser = { ...formData };
            console.log(newUser);
            console.log("Fetching user");
            let response = await fetch("http://localhost:8080/Businesses/Get/One", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": "Fm2nkgiEpuyPBjKQtwjhKbOKbHvH74vZPZIi0qH53W2rPp4odS2GLTCt96AcoPcn",
                    "Access-Control-Request-Headers": "*"
                },
                body: JSON.stringify(newUser),
            });
            const record = await response.json();
            if (record!= null) {
                console.log(record);
                console.log("Found business");
                user.name = record.name;
                navigate('/Map');
            } else {
                // popup notification
                console.log("invalid login");
                setShowPopup(true);
            }
        }
        async function fetchAccount() {
            const newUser = { ...formData };
            console.log(newUser);
            console.log("Fetching user");
            let response = await fetch("http://localhost:8080/Users/Get/One", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": "Fm2nkgiEpuyPBjKQtwjhKbOKbHvH74vZPZIi0qH53W2rPp4odS2GLTCt96AcoPcn",
                    "Access-Control-Request-Headers": "*"
                },
                body: JSON.stringify(newUser),
            });
            const record = await response.json();
            // valid account
            if (record != null) {
                console.log(record);
                console.log("FOUND!");
                user.name = record.firstName;
                navigate('/Map');
            } else {
                // no user account, try fetching business account
                fetchBusinessAccount();
            }
        }
        fetchAccount();
    }
    // keeps track of input changes in form
    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
    }
    // returns form
    function form() {
        return (
            <div>
                <header className="Form-Header">Login
                <form className="Form" onSubmit={handleSubmit}>
                    <label>
                        Email: 
                        <input type="text" id="email" name="email" placeholder="youremail@gmail.com" value={formData.email} onChange={handleChange}></input>
                    </label>
                    <label>
                        Password:
                        <input type="password" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange}></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                </header>
                <Popup open={showPopup} onClose={() => setShowPopup(false)}
                contentStyle={{width: '300px'}}>
                    <div>
                        <p>Your Email or Password is incorrect. Please try again.</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </Popup>
            </div>
        )
    }
    return (
        <div>
            {form()}
        </div>
    )
}
