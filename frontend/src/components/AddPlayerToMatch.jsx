function AddPlayerToMatch({ matches, people}) {
    console.log('MatcheS:', matches)
    return (
        <form id="add-form">
            <h2>Add Player to Match</h2>

            <label>Select Match:</label>
            <select required>
                <option value="">Select a Match</option>
                {matches.map(m => <option key={m.match_id} value={m.match_id}>{m.match_id}</option>)}
            </select>

            <label> Select Player: </label>
            <select required>
                <option value="">Select a Player</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

            <label> Starting Side: </label>
            <select required>
                <option value="left">Left</option>
                <option value="right">Right</option>
            </select>

            <label> Player Order: </label>
            <select required>
                <option value="player 1">Player 1</option>
                <option value="player 2">Player 2</option>
            </select>

            <button type="submit">Add Player to Match</button>
        </form>
    );
}

export default AddPlayerToMatch;