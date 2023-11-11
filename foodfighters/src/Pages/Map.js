import "leaflet/dist/leaflet.css";
import { React, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

/* TODOs
- Design markers (I'm not sure if I want the icon to be a generic icon or to be a div that always shows the information)
- Also food banks should be visually distinct from food pantries 
- Design click behavior (If the marker is a generic icon, shows the information. If it already shows the information, clicking it should show more information)
- Add geocoding search bar (was working on this, but there were some bugs with the existing packages)
- Maybe add locate user button (map.locate() call)
- Maybe add full screen button (toggles size using css style)
- Possibly make marker size change with zoom level
- Once everything is done, remove the examples
*/

// Temporary example business data
// Position coordinates should be capture and stored with the business using something like https://geocode.maps.co/
const business = [
    {
        position: [29.6609563, -82.3285205],
        name: "Bread of the Mighty Food Bank",
        address: "325 NW 10th Ave, Gainesville, FL 32601",
        email: "MightyBread@fakemail.com"
    },
    {
        position: [29.643946, -82.355659],
        name: "University of Florida",
        address: "1225 Center Dr, Gainesville, FL 32610",
        email: "UF@fakemail.com"
    },
    {
        position: [29.647310, -82.324760],
        name: "Free Grocery Store",
        address: "433 S Main St, Gainesville, FL 32601",
        email: "A&C@Fakemail.com"
    }
]

export function Map() {
    const [businesses, setBusinesses] = useState([
        { // business data template
            position: [0,0],
            name: "",
            address: "",
            email: ""
        }
    ]);

    /* divIcons use <div>s instead of image files
    const businessDivIcon = new divIcon({
        className: 'business-marker',
        html:  `<p>${marker.name}</p>`,
    })*/

    const businessIcon = new Icon({
        // Temporary icon - Will be removed later
        iconUrl: require("../healthy-food.png"),
        iconSize: [40,40]
    })

    useEffect(() => { setBusinesses(business) }, [])

    return (
        <MapContainer center={[29.6520, -82.3250] } zoom={13}>
            <TileLayer
                attribution="https://www.openstreetmap.org/copyright"
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {businesses && businesses.map(marker => (
                <Marker 
                    position={marker.position} 
                    icon={businessIcon}
                    eventHandlers={{
                        // Example click event
                        click: (e) => {
                            console.log(`Click event for reference. You clicked ${marker.name}`, e)
                        },
                    }}
                    >
                    <Popup className="business-popup">
                        <div className="content">
                            <div>{marker.name}</div>
                            <div>Address: {marker.address}</div>
                            <div>Email: {marker.email}</div>
                        </div>
                        </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
