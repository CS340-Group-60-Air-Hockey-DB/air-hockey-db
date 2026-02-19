function AddMatch({ locations }) {
    return (
        <form id="add-form">
            <h2>Add a New Match</h2>

            <label>Location: </label>
            <select required>
                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
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