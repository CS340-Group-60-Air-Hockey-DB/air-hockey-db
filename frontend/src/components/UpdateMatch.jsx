import React from 'react';

function UpdateMatch({ matches, locations, people }) {
    console.log('Update matches - match:', matches)

    return (
        <form>
            <h2>Update an Existing Match</h2>

            <label>Select Match:</label>
            <select required>
                <option value="">Select a Match</option>
                {matches.sort((a, b) => a.match_id - b.match_id).map(m => <option key={m.match_id} value={m.match_id}>{m.match_id}</option>)}
            </select>

            <br /><br />

            <label>Update Location: </label>
            <select>
                <option value="">Select a Location</option>
                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
            </select>

            <label>Update Winner: </label>
            <select>
                <option value="">Select a Player</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
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