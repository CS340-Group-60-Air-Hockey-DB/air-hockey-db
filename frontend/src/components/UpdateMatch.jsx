import React from 'react';

function UpdateMatch({ matches, locations, people }) {
    return (
        <form>
            <h2>Update an Existing Match</h2>

            <label>Select Match:</label>
            <select required>
                {matches.map(m => <option key={m.id} value={m.id}>{m.description}</option>)}
            </select>

            <br /><br />

            <label>Update Location: </label>
            <select>
                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
            </select>

            <label>Update Winner: </label>
            <select>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.name}</option>)}
            </select>

            <br /><br />

            <label>Update Match Status: </label>
            <select>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
            </select>

            <label> Update End Time: </label>
            <input type="datetime-local" name="end_datetime" />

            <br /><br />

            <button type="submit">Update Match</button>

        </form>
    );
}

export default UpdateMatch;