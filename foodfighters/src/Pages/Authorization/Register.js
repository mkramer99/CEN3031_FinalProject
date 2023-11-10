import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export function Register() {
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // if all fields filled and no duplicate email
        navigate('/Map')
    }
    const handleChange = (event) => {
        console.log("change");
        const {name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
    }
    function form() {
        return (
            <div>
                <header className="Form-Header">Register an Account
                <form className="Form" onSubmit={handleSubmit}>
                    <label>
                        First Name: 
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
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
    return (
        <div>
            {form()}
            {/* <button onClick={() => auth()}>Submit</button> */}
        </div>
    )
}

