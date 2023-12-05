import { React, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import user from './Authorization/User';

/* TODOs
- Maybe add locate user button (map.locate() call)
- Possibly make marker size change with zoom level
*/

// prints record objects to page for debugging
const Record = (props) => (
    <table>
        <tbody>
            <tr>
                <td>{props.record.name}</td>
                <td>{props.record.address}</td>
            </tr>
        </tbody>
    </table>
   );

export function Map() {
    const [records, setRecords] = useState([]);
    useEffect(() => { 
        async function getBusinesses() {
            console.log("Getting business records");
            const response = await fetch("http://localhost:8080/Businesses/Get/AllLocations");
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
        iconUrl: require("../MarkerIconBlueO.png"),
        iconSize: [50,50],
        iconAnchor: [25,40]
    })
                
    return (
        <div>
            <header className="Map-header">
                Hello, {user.name}
                {/* Map's default location in map is Gainesville */}
                <MapContainer center={[29.6520, -82.3250] } zoom={13}>
                    <TileLayer
                        attribution="https://www.openstreetmap.org/copyright"
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FullscreenControl position='topleft' forceSeparateButton='true' />

                    {/* when records are updated, create marker for each record located at stored coordinates */}
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
                                            Address: {marker.address.substring(0, marker.address.lastIndexOf(","))}<br/>
                                            Email: {marker.email}<br/>
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
