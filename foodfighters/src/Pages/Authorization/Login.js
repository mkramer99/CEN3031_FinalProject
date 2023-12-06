import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NavBar from '../../Navbar';

export function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [errorPopup, setErrorPopup] = useState(false); 
    const [logPop, setLogPop] = useState(false)
    const navigate = useNavigate();
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
                setErrorPopup(true);
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
            if (record != null) {
                console.log(record);
                console.log("FOUND!");
                navigate('/Map');
            } else {
                console.log("invalid login");
                setShowPopup(true);
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
                {<NavBar/>}
                <div className="main">
                    <div className="main_container">
                        <div className="main_content">
                            <h1>Hello, User!</h1>
                                <p>Please Log In<br /><br />If you do not have an account, please create a business or standard account.<br /><br /></p>
                            <button onClick={()=>{setLogPop(true);
                            console.log("test");}} className="logbut">Login</button>
                            {logPop && <div id="logpop" className="popup">
                                <form className="popup-content animation" onSubmit={handleSubmit} method="post">
                                    <div className="toppop">
                                        <span onClick={()=>setLogPop(false)} className="closepop" title="Close">×</span>
                                    </div>
                                        <div className="popcontainer">
                                        <label htmlFor="email"><b><br /><br />Email</b></label>
                                        <input type="text" placeholder="youremail@gmail.com" id="email" name="email" required value={formData.email} onChange={handleChange}/>
                                        <label htmlFor="password"><b><br /><br />Password</b></label>
                                        <input type="password" id="password" name="password" placeholder="********" required value={formData.password} onChange={handleChange}/>
                                        <label><br /><br /></label>
                                        <button type="submit" className="submitbut">Submit</button>
                                        <label><br /><br /></label>
                                    </div>
                                </form>
                            </div>}
                        </div>
                    </div>
                </div>
                <Popup open={errorPopup} onClose={() => setErrorPopup(false)}
                contentStyle={{width: '300px'}}>
                    <div >
                        <p>Your Email or Password is incorrect. Please try again.</p>
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
