function AddSet({ matches }) {
    return (
        <form>
            <h2>Add a New Set</h2>

            <label>Select Match:</label>
            <select required>
                {matches.map(m => <option key={m.id} value={m.id}>{m.description}</option>)}
            </select>

            <label> Set Number: </label>
            <input type="number" min="1" max="7" required />

            <label> Status: </label>
            <select required>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button type="submit">Add Set</button>
        </form>  
    );
}

export default AddSet;