import React, { useState } from 'react';
import AddMatchOfficial from '../components/AddMatchOfficial';
import { useLocation } from 'react-router-dom';

function MatchOfficials(props) {
    const { setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [matchOfficials, setMatchOfficials] = useState([
        { match_official_id: 1, person_name: 'Jane Doe', set_description: 'Set 1 of Match 1', official_type: 'referee' },
        { match_official_id: 2, person_name: 'John Smith', set_description: 'Set 2 of Match 1', official_type: 'witness' },
    ]);

    const [people] = useState([
        { id: 1, name: 'Jane Doe' },
        { id: 2, name: 'John Smith' }
    ]);

    const [sets] = useState([
        { id: 1, description: 'Set 1 of Match 1' },
        { id: 2, description: 'Set 2 of Match 1' }
    ]);

    return (
        <div className="page-container">
            <h1>Match Officials</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Match Official ID</th>
                        <th>Name</th>
                        <th>Set Description</th>
                        <th>Official Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matchOfficials.map((mo) => (
                        <tr key={mo.match_official_id}>
                            <td>{mo.match_official_id}</td>
                            <td>{mo.person_name}</td>
                            <td>{mo.set_description}</td>
                            <td>{mo.official_type}</td>
                            <td><button>Remove Official</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <hr />

            <AddMatchOfficial people={people} sets={sets} />

        </div>
    )
}

export default MatchOfficials;