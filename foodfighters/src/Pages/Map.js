import { React, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";

/* TODOs
- Design markers (I'm not sure if I want the icon to be a generic icon or to be a div that always shows the information)
- Also food banks should be visually distinct from food pantries 
- Design click behavior (If the marker is a generic icon, shows the information. If it already shows the information, clicking it should show more information)
- Add geocoding search bar (was working on this, but there were some bugs with the existing packages)
- Maybe add locate user button (map.locate() call)
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
        email: "A&C@fakemail.com"
    }
]


// prints record objects to page for debugging
const Record = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.address}</td>
    </tr>
   );

export function Map() {
    const [records, setRecords] = useState([]);
    useEffect(() => { 
        async function getBusinesses() {
            console.log("Getting business records");
            const response = await fetch("http://localhost:8080/Businesses/Get/All");
            const records = await response.json();
            setRecords(records);
        }
        getBusinesses();
        return;
    }, [records.length]);

    // maps out the businesses to Record objects
    function businessList() {
        return records.map((record) => {
            return (
                <div>
                <p>{record.name}</p>
                <Record
                record = {record}
                key={record._id}
                />
                </div>
            )
        })
    }


    // Placeholder business data
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

    const businessIcon = new L.Icon({
        // Temporary icon - Will be removed later
        iconUrl: require("../MarkerIconBlueO.png"),
        iconSize: [50,50],
        iconAnchor: [25,40]
    })

    useEffect(() => { setBusinesses(business)}, [])
                
    return (
        <div>
            <header className="Map-header">
                <MapContainer center={[29.6520, -82.3250] } zoom={13}>
                    <TileLayer
                        attribution="https://www.openstreetmap.org/copyright"
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FullscreenControl position='topleft' forceSeparateButton='true' />
                    {businesses && businesses.map(marker => (
                        <Marker 
                            position={marker.position} 
                            icon={businessIcon}>
                            {
                                <Popup className="business-popup">
                                    <div className="content">
                                        <h2 className='business-name'><b>{marker.name}</b></h2>
                                        <p className='business-contact'>
                                            <b>Contact Information</b><br/>
                                            Address: {marker.address}<br/>
                                            Email: {marker.email}<br/>
                                            Phone: 1-111-111-1111
                                        </p>
                                    </div>
                                </Popup>
                            }
                        </Marker>
                    ))}
                </MapContainer>
            </header>
            {businessList()}
        </div>
    );
}
