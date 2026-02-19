import React, { useState } from 'react';
import AddMatchOfficial from '../components/AddMatchOfficial';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function MatchOfficials(props) {
    const { backendURL, locale, matches, people, sets, setUserLocation } = props
    const userLocation = useLocation()

    setUserLocation(userLocation)

    // sample data for this phase
    const [matchOfficials, setMatchOfficials] = useState([]);

    useEffect(() => {
        const fetch_officials = async () => {
            try{
                const res = await fetch(backendURL + '/match_officials')

                const data = await res.json()
                setMatchOfficials(data)
            }
            catch(error){
                console.log('Match Officials Fetch Error:', error)
            }
        }

        if(!matchOfficials || matchOfficials.length === 0){
            fetch_officials()
        }
    }, [backendURL])

    return (
        <div className="page-container">
            <div>
                <h1>
                    Match Officials
                </h1>
                <p>
                    Browse and manage referees and witnesses assigned to sets. Track official assignments and roles. Add, edit, or remove official records.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {
                            matchOfficials?.length > 0 && Object.keys(matchOfficials[0])?.map((headers, idx) => {
                                let header = headers
                                if(header === 'match_num'){
                                    header = 'match_number'
                                }
                                else if(header === 'set_num'){
                                    header = 'set_number'
                                }

                                return (
                                    <th key={`${header}-${idx}`}>
                                        { cap_words(header) }
                                    </th>
                                )
                            })
                        }
                        { matchOfficials?.length > 0 && <th>Actions</th> }
                    </tr>
                </thead>

                <tbody>
                    {matchOfficials?.map((mo, idx) => {
                        return <TableRow
                            key={idx}
                            rowObject={mo}
                            backendURL={backendURL}
                       />
                    })}
                </tbody>
            </table>
            
            <hr />

            <AddMatchOfficial people={people} sets={sets} matches={matches}/>

        </div>
    )
}

export default MatchOfficials;