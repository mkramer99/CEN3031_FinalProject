import { React, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import user from './User';

export function RegisterBusiness() {
    const [formData, setFormData] = useState({name: "", street: "", city: "", country: "", state: "", zip: "", email: "", password: "", confirmPassword: "", lat: "", lon: ""});
    const navigate = useNavigate();

    const geoCodeFormData = async () => {
        let formattedAddress = {street: formData.street, city: formData.city, country: formData.country, state: formData.state, zip: formData.zip};
        for (const [key,value] of Object.entries(formattedAddress)) {
            formattedAddress[key] = value.replaceAll(/\s+/g,'+');
        };
        let geoCodeQuery = `https://geocode.maps.co/search?street=${formattedAddress["street"]}&city=${formattedAddress["city"]}&state=${formattedAddress["state"]}&postalcode=${formattedAddress["zip"]}&country=${formattedAddress["country"]}`;
        const res = await fetch(geoCodeQuery);
        const data = await res.json();     
        return data;
    };

    async function handleSubmit(event) {
        event.preventDefault(); 
        const data = await geoCodeFormData();
        const newUser = { ...formData, lon: data[0].lon, lat:data[0].lat};
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
                user.name = formData.name;
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
            <div className='Form-Content'>
                Name
                <input type="text" id="name" name="name" placeholder="Business Name" value={formData.name} onChange={handleChange}></input>
                Address <br/>
                <input type="text" id="street" name="street" placeholder="Street" value={formData.street} onChange={handleChange}></input>
                <input type="text" id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange}></input>
                <input type="text" id="country" name="country" placeholder="Country" value={formData.country} onChange={handleChange}></input>
                <input type="text" id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange}></input>
                <input type="text" id="zip" name="zip" placeholder="zip" value={formData.zip} onChange={handleChange}></input> 
                <br/>
                Info
                <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}></input>
                <input type="text" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}></input>
                <input type="text" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange}></input>
            </div>
            <button type="submit">Submit</button>
        </form>
        
        </header>
    </div>
    )
}
