import { React, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import user from './User';
import NavBar from '../../Navbar';
import Popup from 'reactjs-popup';

export function RegisterBusiness() {
    const [formData, setFormData] = useState({name: "", street: "", city: "", country: "", state: "", zip: "", email: "", password: "", confirmPassword: "", lat: "", lon: ""});
    const [errorPopup, setErrorPopup] = useState(false); 
    const [regPopup, setRegPopup] = useState(false);
    const navigate = useNavigate();

    const geoCodeFormData = async () => {
        let formattedAddress = {street: formData.street, city: formData.city, country: formData.country, state: formData.state, zip: formData.zip};
        // formats address for query
        for (const [key,value] of Object.entries(formattedAddress)) {
            formattedAddress[key] = value.replaceAll(/\s+/g,'+');
        };
        // Calls free geocoding api
        let geoCodeQuery = `https://geocode.maps.co/search?street=${formattedAddress["street"]}&city=${formattedAddress["city"]}&state=${formattedAddress["state"]}&postalcode=${formattedAddress["zip"]}&country=${formattedAddress["country"]}`;
        const res = await fetch(geoCodeQuery);
        const data = await res.json();     
        return data;
    };

    async function handleSubmit(event) {
        event.preventDefault(); 
        // check for existing account
        async function fetchAccount(User) {
            const newUser = User;
            console.log("Fetching user");
            /* eslint-disable no-unused-vars */
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
                // popup to display error
                setErrorPopup(true);
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

        const data = await geoCodeFormData();
        if (Object.keys(data).length === 0) {
            setErrorPopup(true);
            return;
        } 
        if (data[0].hasOwnProperty('lon')){
            if (data[0].lon === "") {
                setErrorPopup(true);
                return;
            }
        } else {
            setErrorPopup(true);
            return;
        }
        const newUser = { ...formData, lon: data[0].lon, lat:data[0].lat};
        fetchAccount(newUser);
    }

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value }));
    }
    return (
        <div>
            { <NavBar/> }
            <div className="main">
                <div className="main_container">
                    <div className="main_content">
                        <h1>Hello!</h1>
                        <p>You can register your business on this page!<br /><br />If you already have an account, please log in instead.</p>
                        <p></p>
                        <button onClick={()=>setRegPopup(true)} className="standBut">Register</button>
                        {regPopup && <div id="standPop" className="popup">
                            <form className="popup-content animation" onSubmit={handleSubmit}>
                                    <div className="toppop">
                                        <span onClick={()=>setRegPopup(false)} className="closepop" title="Close">×</span>
                                    </div>
                                <div className="popcontainer">
                                    <label ><b><br /><br />Business Name</b></label>
                                    <input type="text" id="name" name="name" placeholder="Business Name" value={formData.name} onChange={handleChange}></input>
                                    <label><b><br /><br />Address</b></label>
                                    <div className='Form-Content'>
                                        <input type="text" id="business-Street" name="street" placeholder="Street" value={formData.street} onChange={handleChange}></input>
                                        <input type="text" id="business-City" name="city" placeholder="City" value={formData.city} onChange={handleChange}></input>
                                        <input type="text" id="business-Country" name="country" placeholder="Country" value={formData.country} onChange={handleChange}></input>
                                        <input type="text" id="business-State" name="state" placeholder="State" value={formData.state} onChange={handleChange}></input>
                                        <input type="text" id="business-Zip" name="zip" placeholder="zip" value={formData.zip} onChange={handleChange}></input> 
                                    </div>
                                    <label><b><br />Email</b></label>
                                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}></input>
                                    <label><b><br /><br />Password</b></label>
                                    <input type="text" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}></input>
                                    <input type="text" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange}></input>
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
                <p>There was an error. Address is invalid or account already exists.</p>
                <button onClick={() => setErrorPopup(false)}>Close</button>
            </div>
        </Popup>
            
    </div>
    )
}
