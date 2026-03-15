import { useState } from 'react';

function AddPlayerToMatch({ backendURL, matches, people, onAdd }) {
    const [matchId, setMatchId] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [startingSide, setStartingSide] = useState('left');
    const [playerOrder, setPlayerOrder] = useState('player_1');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlayerMatch = {
            match_id: matchId,
            player_id: playerId,
            starting_side: startingSide,
            player_order: playerOrder
        };

        try {
            const response = await fetch(`${backendURL}/player_matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlayerMatch),
            });

            if (response.ok) {
                alert("Player added to match successfully!");
                await onAdd(); // refresh table

                // clear form
                setMatchId('');
                setPlayerId('');
                setStartingSide('left');
                setPlayerOrder('player_1');
            } else {
                alert("Failed to add player to match.")
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <form id="add-form" onSubmit={handleSubmit}>
            <h2>Add Player to Match</h2>

            <label>Select Match:</label>
            <select required value={matchId} onChange={(e) => setMatchId(e.target.value)}>
                <option value="" disabled>Select a Match</option>
                {matches.map(m => <option key={m.match_id} value={m.match_id}>Match {m.match_id}</option>)}
            </select>

            <label> Select Player: </label>
            <select required value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
                <option value="" disabled>Select a Player</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

            <label> Starting Side: </label>
            <select required value={startingSide} onChange={(e) => setStartingSide(e.target.value)}>
                <option value="left">Left</option>
                <option value="right">Right</option>
            </select>

            <label> Player Order: </label>
            <select required value={playerOrder} onChange={(e) => setPlayerOrder(e.target.value)}>
                <option value="player_1">Player 1</option>
                <option value="player_2">Player 2</option>
            </select>

            <button type="submit">Add Player to Match</button>
        </form>
    );
}

export default AddPlayerToMatch;