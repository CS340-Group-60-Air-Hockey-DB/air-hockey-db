import React, { useState } from 'react';
import AddGame from '../components/AddGame';
import { useLocation } from 'react-router-dom';

function Games(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [games, setGames] = useState([
        { game_id: 1, set_id: 1, game_num: 1, p1_score: 7, p2_score: 5, status: 'completed' },
        { game_id: 2, set_id: 1, game_num: 2, p1_score: 0, p2_score: 0, status: 'scheduled' }
    ])

    const [sets] = useState([
        { id: 1, description: 'Set 1 of Match 1' },
        { id: 2, description: 'Set 2 of Match 1' },
    ]);

    return (
        <div className="page-container">
            <div>
                <h1>
                    Games
                </h1>
    
                <p>
                    Browse and manage individual games within sets. View game scores, status, and timing for each game. Add, edit, or remove games.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Game ID</th>
                        <th>Set ID</th>
                        <th>Game Number</th>
                        <th>Player 1 Score</th>
                        <th>Player 2 Score</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.game_id}>
                            <td>{game.game_id}</td>
                            <td>{game.set_id}</td>
                            <td>{game.game_num}</td>
                            <td>{game.p1_score}</td>
                            <td>{game.p2_score}</td>
                            <td>{game.status}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            <AddGame sets={sets} />
        </div>
    );
}

export default Games;