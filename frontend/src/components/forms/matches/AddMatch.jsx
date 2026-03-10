import { useState } from 'react';

function AddMatch({ backendURL, locations, people, onAdd }) {
    const [formData, setFormData] = useState({
        location_id: '',
        winner_id: '',
        set_max: 3,
        faceoff_type: 'standard',
        start_datetime: '',
        end_datetime: '',
        match_type: 'challenge',
        match_status: 'scheduled',
        note: ''
    });

    // updates state whenever a user picks an option
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    // trigger POST requst when user clicks "Add Match"
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Match successfully added!");

                //clear form
                setFormData({
                    location_id: '', winner_id: '', set_max: 3, faceoff_type: 'standard',
                    start_datetime: '', end_datetime: '', match_type: 'challenge', 
                    match_status: 'scheduled', note: ''
                });
                //refresh table data
                if (onAdd) onAdd();
            } else {
                const err = await response.json();
                alert(`Error: ${err.error || "Failed to add match"}`);
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            alert("The match was unable to be created. Please try again or contact the administrator.")
        }
    };

    return (
        <form id="add-form" onSubmit={handleSubmit}>
            <h2>Add a New Match</h2>

            <label>Location: </label>
            <select name="location_id" value={formData.location_id} onChange={handleChange} required>
                <option value="">-- Select a Location --</option>
                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
            </select>

            <label> Start: </label>
            <input type="datetime-local" name="start_datetime" value={formData.start_datetime} onChange={handleChange} required />

            <label> Type: </label>
            <select name="match_type" value={formData.match_type} onChange={handleChange} required>
                <option value="challenge">Challenge</option>
                <option value="tournament">Tournament</option>
                <option value="league">League</option>
            </select>

            <label> Status: </label>
            <select name="match_status" value={formData.match_status} onChange={handleChange} required>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
            </select>

            <label> Set Max: </label>
            <select name="set_max" value={formData.set_max} onChange={handleChange} required>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
            </select>

            <label> Faceoff Type: </label>
            <select name="faceoff_type" value={formData.faceoff_type} onChange={handleChange} required>
                <option value="standard">Standard</option>
                <option value="puck flip">Puck Flip</option>
            </select>

            <label> End (Optional): </label>
            <input type="datetime-local" name="end_datetime" value={formData.end_datetime} onChange={handleChange} />

            <label> Winner (Optional): </label>
            <select name="winner_id" value={formData.winner_id} onChange={handleChange}>
                <option value="">-- TBD / None --</option>
                {people && people.map(person => (
                    <option key={person.person_id} value={person.person_id}>
                        {person.first_name} {person.last_name}
                    </option>
                ))}
            </select>

            <label> Notes (Optional): </label>
            <textarea name="note" value={formData.note} onChange={handleChange} maxLength="10000" />
            
            <button type="submit">Add Match</button>
        </form>
    );
}

export default AddMatch;