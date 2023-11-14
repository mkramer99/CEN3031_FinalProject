import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        async function fetchAccount() {
            const newUser = { ...formData };
            console.log(newUser);
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
                console.log("FOUND!");
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
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}></input>
                    </label>
                    <label>
                        Password:
                        <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}></input>
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
