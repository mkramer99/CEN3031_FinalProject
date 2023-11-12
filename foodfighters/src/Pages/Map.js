import React, { useEffect, useState } from 'react';
import user from './Authorization/User';

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
    const businessMap = businessList();

    return (
        <div>
            <header className="App-header">
                Hello {user.name} !
            </header>
            {businessList()}
        </div>
    );
}