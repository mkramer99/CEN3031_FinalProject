import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
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
            if (record != null) {
                console.log(record);
                console.log("FOUND!");
                navigate('/Map');
            } else {
                console.log("invalid login");
                // TODO: implement popup or page text to display error
            }
        }
        fetchAccount();
    }


    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
    }

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
                        <input type="text" id="password" name="password" placeholder="********" value={formData.password} onChange={handleChange}></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                </header>
            </div>
        )
    }
    return (
        <div>
            {form()}
            {/* <button onClick={() => auth()}>Submit</button> */}
        </div>
    )
}
