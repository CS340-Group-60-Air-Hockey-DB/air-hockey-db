function AddPlayerToMatch({ matches, people}) {
    return (
        <form>
            <h2>Add Player to Match</h2>

            <label>Select Match:</label>
            <select required>
                {matches.map(m => <option key={m.id} value={m.id}>{m.description}</option>)}
            </select>

            <label> Select Player: </label>
            <select required>
                {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
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