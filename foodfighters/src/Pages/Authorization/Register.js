import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import user
 from './User';
import NavBar from '../../Navbar';

export function Register() {
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
    const [errorPopup, setErrorPopup] = useState(false); 
    const [regPopup, setRegPopup] = useState(false);
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
                console.log("ACCOUNT ALREADY EXISTS!");
                // popup to display error
                setErrorPopup(true);
            } else {
                user.name = formData.firstName;
                // if no existing account, create new one
                /* eslint-disable no-unused-vars */
                let response = await fetch("http://localhost:8080/Register", {
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

    function form() {
        return (
            <div>
                { <NavBar/> }
                <div className="main">
                    <div className="main_container">
                        <div className="main_content">
                            <h1>Hello, New User!</h1>
                            <p>Please create your Standard account!<br /><br />If you already have an account, please log in instead.</p>
                            <p></p>
                            <button onClick={()=>setRegPopup(true)} className="standBut">Register</button>
                            {regPopup && <div id="standPop" className="popup">
                                <form className="popup-content animation" onSubmit={handleSubmit}>
                                    <div className="popcontainer">
                                    <div className="toppop">
                                        <span onClick={()=>setRegPopup(false)} className="closepop" title="Close">×</span>
                                    </div>
                                        <label htmlFor="firstname"><b><br /><br />First Name</b></label>
                                        <input type="text" placeholder="Jane" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange}></input>
                                        <label htmlFor="lastname"><b><br /><br />Last Name</b></label>
                                        <input type="text" id="lastName" name="lastName" placeholder="Doe" required  value={formData.lastName} onChange={handleChange}></input>
                                        <label htmlFor="email"><b><br /><br />Email</b></label>
                                        <input type="email" id="email" name="email" placeholder="youremail@gmail.com" required value={formData.email} onChange={handleChange}></input>
                                        <label htmlFor="password"><b><br /><br />Password</b></label>
                                        <input type="text" id="password" name="password" placeholder="********" required  value={formData.password} onChange={handleChange}></input>
                                        <label htmlFor="password"><b><br /><br />Confirm Password</b></label>
                                        <input type="text" id="confirmPassword" name="confirmPassword" placeholder="********" required value={formData.confirmPassword} onChange={handleChange}></input>
                                        <label><br /><br /></label>
                                        <button type="submit" className="submitbut">Submit</button>
                                        <label><br /><br /></label>
                                    </div>
                                </form>
                            </div> }
                        </div>
                    </div>
                </div>



                <Popup open={errorPopup} onClose={() => setErrorPopup(false)}
                contentStyle={{width: '300px'}}>
                    <div>
                        <p>An account with this email already exists.</p>
                        <button onClick={() => setErrorPopup(false)}>Close</button>
                    </div>
                </Popup>
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

