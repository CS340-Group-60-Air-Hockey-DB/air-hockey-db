function AddMatch({ locations, people }) {
    return (
        <form>
            <h2>Add a New Match</h2>

            <label>Location: </label>
            <select required>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
            </select>

            <label> Type: </label>
            <select>
                <option value="challenge">Challenge</option>
                <option value="tournament">Tournament</option>
                <option value="league">League</option>
            </select>

            <label> Start: </label>
            <input type="datetime-local" required />

            <button type="submit">Add Match</button>
        </form>
    );
}

export default AddMatch;