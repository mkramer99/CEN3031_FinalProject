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


// prints record objects to page for debugging
const Record = (props) => (
    <trbody>
        <tr>
        <td>{props.record.name}</td>
        <td>{props.record.address}</td>
        </tr>
    </trbody>
   );

export function Map() {
    const [records, setRecords] = useState([]);
    useEffect(() => { 
        async function getBusinesses() {
            console.log("Getting business records");
            const response = await fetch("http://localhost:8080/Businesses/Get/All");
            const records = await response.json();
            setRecords(records);
            console.log(records);
        }
        getBusinesses();
        return;
    }, [records.length]);

// maps out the businesses to Record objects
    function businessList() {
        return records.map((record) => {
            return (
                <div>
                <Record
                record = {record}
                key={record._id}
                />
                </div>
            )
        })
    }

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
                
    return (
        <div>
            <header className="Map-header">
                <MapContainer center={[29.6520, -82.3250] } zoom={13}>
                    <TileLayer
                        attribution="https://www.openstreetmap.org/copyright"
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FullscreenControl position='topleft' forceSeparateButton='true' />
                    {records && records.map(marker => (
                        <Marker 
                            position={[marker.lat, marker.lon]} 
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
