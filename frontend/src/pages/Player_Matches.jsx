import React, { useState } from 'react';
import AddPlayerToMatch from '../components/AddPlayerToMatch';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PlayerMatches(props) {
    const { backendURL, locale, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // sample data for this phase
    const [matches, setMatches] = useState([])
    const [players, setPlayers] = useState([])
    const [playerMatches, setPlayerMatches] = useState([]);


    useEffect(() => {
        const all_matches = async () => {}

        const all_players = async () => {}

        const all_player_matches = async () => {}

        if(matches?.length === 0){
            all_matches()
        }
        if(players?.length === 0){
            all_players()
        }
        if(playerMatches?.length === 0){
            all_player_matches()
        }
    }, [backendURL])
    
    return (
        <div className="page-container">
            <div>
                <h1>
                    Player Matches
                </h1>
                <p>
                    View player participation in matches. See which players competed in each match, their starting positions, match scores, and outcomes. Add, edit, or remove player-match records.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Starting Side</th>
                        <th>Player Order</th>
                        <th>Opponent</th>
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

            <AddPlayerToMatch matches={matches} people={players} />
            
        </div>
    )
}

export default PlayerMatches;
