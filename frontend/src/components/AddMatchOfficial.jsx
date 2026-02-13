function AddMatchOfficial({ people, sets }) {
    return (
        <form>
            <h2>Add a Match Official</h2>

            <label>Person: </label>
            <select required>
                {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <label> Set: </label>
            <select required>
                {sets.map(s => <option key={s.id} value={s.id}>{s.description}</option>)}
            </select>

            <label> Role: </label>
            <select required>
                <option value="referee">Referee</option>
                <option value="witness">Witness</option>
            </select>

            <button type="submit">Add Match Official</button>
        </form>
    );
}

export default AddMatchOfficial;