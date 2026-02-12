import React, { useState } from 'react';
import AddMatch from '../components/AddMatch';
import UpdateMatch from '../components/UpdateMatch';

function Matches() {
    // sample data for this phase
    const [matches, setMatches] = useState([
        { match_id: 1, location_name: 'Location 1', winner_name: 'Jane Doe', match_status: 'completed', start_datetime: '2026-02-12 14:00:00'},
        { match_id: 2, location_name: 'Location 2', winner_name: 'John Smith', match_status: 'scheduled', start_datetime: '2026-02-15 16:00:00'},
    ]);

    const [locations] = useState([
        { id: 1, name: 'Location 1' },
        { id: 2, name: 'Location 2' },
    ]);

    const [people] = useState([
        { id: 1, name: 'Jane Doe' },
        { id: 2, name: 'John Smith' },
    ]);

    return (
        <div className="page-container">
            <h1>Air Hockey Matches</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Location</th>
                        <th>Winner</th>
                        <th>Status</th>
                        <th>Start Date & Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
                        <tr key={match.match_id}>
                            <td>{match.match_id}</td>
                            <td>{match.location_name}</td>
                            <td>{match.winner_name}</td>
                            <td>{match.match_status}</td>
                            <td>{match.start_datetime}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
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