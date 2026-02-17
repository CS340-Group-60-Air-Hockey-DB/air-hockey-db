import React, { useState } from 'react';
import AddMatch from '../components/AddMatch';
import UpdateMatch from '../components/UpdateMatch';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function Matches(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [locations, setLocations] = useState([]);
    const [matches, setMatches] = useState([]);
    const [people, setPeople] = useState([])


    useEffect(() => {
        const getMatches = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/matches');
                
                // Convert the response into JSON format
                const matches = await response.json();
        
                // Update the matches state with the response data
                setMatches(matches);
                
            } catch (error) {
                // If the API call fails, print the error to the console
                console.log(error);
            }
        };
        
        getMatches()
    }, [backendURL]);


    return (
        <div className="page-container">
            <div>
                <h1>Air Hockey Matches</h1>
                
                <p>
                    Browse and manage competitive matches. View match details including location, type, status, and winner. Add, edit, or remove matches.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {
                            matches?.length > 0 && Object.keys(matches[0])?.map((header, idx) => {
                                if(header === 'start_datetime'){
                                    return (
                                        <th key={`header-${idx}`}>
                                            { cap_words('start_time') }
                                        </th>
                                    )
                                }
                                else if(header === 'end_datetime'){
                                    return (
                                        <th key={`header-${idx}`}>
                                            { cap_words('end_time') }
                                        </th>
                                    )
                                }
                                else if(header === 'winner_id'){
                                    return (
                                        <th key={`header-${idx}`}>
                                            { cap_words('winner') }
                                        </th>
                                    )
                                }
                                else{
                                    return (
                                        <th key={`header-${idx}`}>
                                            { cap_words(header) }
                                        </th>
                                    )
                                }
                            })
                        }

                        { matches?.length > 0 ? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        matches?.map((match, index) => {
                            let match_row = match
                            delete match_row.match_id

                            match_row.start_datetime = match.start_datetime ? new Date(match.start_datetime).toLocaleDateString(locale, { 
                                hour: "numeric",
                                minute: "numeric"
                            }) : null

                            console.log('end time:', match.end_datetime)
                            
                            match_row.end_datetime = match.end_datetime ? new Date(match.end_datetime).toLocaleDateString(locale, {
                                hour: "numeric",
                                minute: "numeric"
                            }) : null

                            return <TableRow key={`match-${index}`} rowObject={match_row} backendURL={backendURL} />
                        })
                    }
                </tbody>
            </table>

            <hr />

            <AddMatch locations={locations} people={people} />
            
            <hr />

            <UpdateMatch matches={matches} locations={locations} people={people} />

        </div>
    )
}

export default Matches;