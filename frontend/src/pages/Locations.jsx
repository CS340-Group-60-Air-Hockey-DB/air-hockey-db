// This will include the person's first + last name of who owns the location

import React, { useState } from 'react';
import AddLocation from '../components/AddLocation';
import UpdateLocation from '../components/UpdateLocation';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function Locations(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // including sample data for this phase
    const [locations, setLocations] = useState([]);


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
            <div>
                <h1>Locations</h1>
                
                <p>
                    Browse locations where Air Hockey tables can be found and includes locations for venues of tournaments. Track table quantities, associated owner or business, venue details, and tournament locations. Add, edit, or remove locations.
                </p>                
            </div>
            
            <table className="data-table">
                <thead>
                    <tr>
                        {locations?.length > 0 && Object.keys(locations[0])?.map((header, index) => {
                            if(header === 'table_qty'){
                                return (
                                    <th key={index}>
                                        { cap_words('table_quantity') }
                                    </th>
                                )
                            }
                            else if(header === 'phone_num'){
                                return (
                                    <th key={index}>
                                        { cap_words('phone_number') }
                                    </th>
                                )
                            }
                            else{
                                return (
                                    <th key={index}>
                                        { cap_words(header) }
                                    </th>
                                )
                            }
                        })}
                            <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {locations?.map((location, index) => {
                        let location_row = location
                        delete location_row.location_id
                        
                        return <TableRow key={index} rowObject={location_row} backendURL={backendURL} />
                    })}
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