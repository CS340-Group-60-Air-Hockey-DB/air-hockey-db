import React, { useState } from 'react';
import AddSet from '../components/AddSet';
import { useLocation } from 'react-router-dom';

function Sets(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [sets, setSets] = useState([
        { set_id: 1, match_id: 1, set_num: 1, set_status: 'completed', winner_name: 'Jane Doe' },
        { set_id: 2, match_id: 1, set_num: 2, set_status: 'in_progress', winner_name: 'TBD' },
    ])

    const [matches] = useState([
        { id: 1, description: 'Match 1' },
        { id: 2, description: 'Match 2' },
    ]);

    return (
        <div className="page-container">
            <h1>Sets</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Set ID</th>
                        <th>Match ID</th>
                        <th>Set Number</th>
                        <th>Status</th>
                        <th>Winner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sets.map((set) => (
                        <tr key={set.set_id}>
                            <td>{set.set_id}</td>
                            <td>{set.match_id}</td>
                            <td>{set.set_num}</td>
                            <td>{set.set_status}</td>
                            <td>{set.winner_name}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            <AddSet matches={matches} />

        </div>
    );
}

export default Sets;