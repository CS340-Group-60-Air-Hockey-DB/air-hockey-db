import { useState, useEffect } from 'react';

function EditPlayerMatch({ backendURL, matches, people, playerMatch, onUpdate, onCancel }) {
    const [matchId, setMatchId] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [startingSide, setStartingSide] = useState('');
    const [playerOrder, setPlayerOrder] = useState('');

    // auto-fill form based on selected playerMatch
    useEffect(() => {
        if (playerMatch) {
            setMatchId(playerMatch.match_id);
            setPlayerId(playerMatch.player_id);
            setStartingSide(playerMatch.startingSide);

            // format back to database ENUM
            const rawOrder = playerMatch.player_order ? playerMatch.player_order.replace(' ', '_').toLowerCase() : 'player_1';
            setPlayerOrder(rawOrder);
        }
    }, [playerMatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPlayerMatch = {
            match_id: matchId,
            player_id: playerId,
            starting_side: startingSide,
            player_order: playerOrder
        };

        try {
            const response = await fetch(`${backendURL}/player_matches/${playerMatch.player_match_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPlayerMatch),
            });

            if (response.ok) {
                alert("Player match updated successfully!");
                onUpdate(); // refresh table
                onCancel(); // hide edit form
            } else {
                alert("Failed to update player match.")
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <form id="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Player Match</h2>

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

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default EditPlayerMatch;