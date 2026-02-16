// This will include the person's first + last name of who owns the location

import React, { useState } from 'react';
import AddLocation from '../components/AddLocation';
import UpdateLocation from '../components/UpdateLocation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Locations(props) {
    const { backendURL, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // including sample data for this phase
    const [locations, setLocations] = useState([
        { location_id: 1, location_name: 'Location 1', table_qty: 5, city: 'Corvallis', state: 'OR', type_of_address: 'commercial'},
        { location_id: 2, location_name: 'Location 2', table_qty: 3, city: 'Portland', state: 'OR', type_of_address: 'residential'},
    ]);


    // Load table on page load
    useEffect(() => {
        const getLocations = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/locations');
                
                // Convert the response into JSON format
                const data = await response.json();
        
                // Update the locations state with the response data
                setLocations(data);
                
            } catch (error) {
                // If the API call fails, print the error to the console
                console.log(error);
            }
        };

        getLocations()
    }, [backendURL]);


    return (
        <div className="page-container">
            <h1>Air Hockey Venues</h1>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Location ID</th>
                        <th>Location Name</th>
                        <th>Table Quantity</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Type of Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.location_id}>
                            <td>{location.location_id}</td>
                            <td>{location.location_name}</td>
                            <td>{location.table_qty}</td>
                            <td>{location.city}</td>
                            <td>{location.state}</td>
                            <td>{location.type_of_address}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <hr />

            <AddLocation />
            
            <hr />

            <UpdateLocation locations={locations} />

        </div>
    )
}

export default Locations;