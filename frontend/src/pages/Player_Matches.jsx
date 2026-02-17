import React, { useState } from 'react';
import AddPlayerToMatch from '../components/AddPlayerToMatch';
import { useLocation } from 'react-router-dom';

function PlayerMatches(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [playerMatches, setPlayerMatches] = useState([
        { player_match_id: 1, match_id: 1, player_name: 'Jane Doe', starting_side: 'left', player_order: 'player 1' },
        { player_match_id: 2, match_id: 1, player_name: 'John Smith', starting_side: 'right', player_order: 'player 2' },
    ]);

    const [matches] = useState([
        { id: 1, description: 'Match 1' },
        { id: 2, description: 'Match 2' },
    ]);

    const [people] = useState([
        { id: 1, name: 'Jane Doe' },
        { id: 2, name: 'John Smith' },
    ]);
    
    return (
        <div className="page-container">
            <h1>Player Matches</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Match ID</th>
                        <th>Player Name</th>
                        <th>Starting Side</th>
                        <th>Player Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playerMatches.map((pm) => (
                        <tr key={pm.player_match_id}>
                            <td>{pm.player_match_id}</td>
                            <td>{pm.match_id}</td>
                            <td>{pm.player_name}</td>
                            <td>{pm.starting_side}</td>
                            <td>{pm.player_order}</td>
                            <td><button>Remove Player</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            <AddPlayerToMatch matches={matches} people={people} />
            
        </div>
    )
}

export default PlayerMatches;
