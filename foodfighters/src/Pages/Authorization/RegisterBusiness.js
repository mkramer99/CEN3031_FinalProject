import { React, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import user from './User';

export function RegisterBusiness() {
    const [formData, setFormData] = useState({name: "", address: "", email: "", password: "", confirmPassword: "", lat: "", long: ""})
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        const newUser = { ...formData };
        console.log(newUser);

        // check for existing account
        async function fetchAccount() {
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
            if (record != null) {
                console.log(record);
                console.log("ACCOUNT ALREADY EXISTS!");
                // TODO: implement popup or page text to display error
            } else {
                // if no existing account, create new one
                let response = await fetch("http://localhost:8080/RegisterBusiness", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apiKey": "Fm2nkgiEpuyPBjKQtwjhKbOKbHvH74vZPZIi0qH53W2rPp4odS2GLTCt96AcoPcn",
                        "Access-Control-Request-Headers": "*"
                    },
                    body: JSON.stringify(newUser),
                })
                .catch(error => {
                    console.log(error);
                    return;
                }).then(() => navigate('/Map'));
            }
        }
        fetchAccount();
    }

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
    }
    return (
        <div>
        <header className="Form-Header">Register a Business
        <form className="Form" onSubmit={handleSubmit}>
            <label>
                Business Name: 
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}></input>
            </label>
            <label>
                Business Address:
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}></input>
            </label>
            <label>
                E-mail:
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}></input>
            </label>
            <label>
                Password:
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}></input>
            </label>
            <label>
                Confirm Password:
                <input type="text" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}></input>
            </label>
            <button type="submit">Submit</button>
        </form>
        
        </header>
    </div>
    )
}
