import { useState } from 'react';

function UpdateMatch({ backendURL, matches, locations, people }) {

    const [selectedMatchId, setSelectedMatchId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [winnerId, setWinnerId] = useState('');
    const [matchStatus, setMatchStatus] = useState('scheduled');
    const [endDatetime, setEndDatetime] = useState('');

    // auto-fill form when match is selected
    const handleMatchSelect = (e) => {
        const matchId = e.target.value;
        setSelectedMatchId(matchId);

        if (matchId) {
            const match = matches.find(m => m.match_id === parseInt(matchId));
            
            if (match) {
                // get existing data for match
                const foundLocation = locations.find(loc => loc.location_name === match.location_name);
                setLocationId(foundLocation ? foundLocation.location_id: '');

                const foundWinner = people.find(p => (p.first_name + ' ' + p.last_name) === match.winner);
                setWinnerId(foundWinner ? foundWinner.person_id : '');

                setMatchStatus(match.match_status || 'scheduled');

                if (match.end_datetime) {
                    const formattedDate = new Date(match.end_datetime).toISOString().slice(0, 16);
                    setEndDatetime(formattedDate);
                } else {
                    setEndDatetime('');
                }
            }
        } else {
            // clear form
            setLocationId('');
            setWinnerId('');
            setMatchStatus('scheduled');
            setEndDatetime('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData = {
            match_id: selectedMatchId,
            location_id: locationId || null,
            winner_id: winnerId || null,
            match_status: matchStatus,
            end_datetime: endDatetime || null
        };

        try {
            const response = await fetch(`${backendURL}/matches/${selectedMatchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                alert("Match updated successfully!");
                window.location.reload();
            } else {
                alert("Failed to update match. Please try again.");
            }
        } catch (error) {
            console.error("Error during match update:", error);
            alert("An error occurred while connecting to the server.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update an Existing Match</h2>

            <label>Select Match:</label>
            <select required value={selectedMatchId} onChange={handleMatchSelect}>
                <option value="">Select a Match</option>
                {matches.sort((a, b) => a.match_id - b.match_id).map(m => <option key={m.match_id} value={m.match_id}>{m.match_id}</option>)}
            </select>

            <br /><br />

            <label>Update Location: </label>
            <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                <option value="">Select a Location</option>
                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
            </select>

            <label>Update Winner: </label>
            <select value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
                <option value="">Select a Player</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

            <br /><br />

            <label>Update Match Status: </label>
            <select value={matchStatus} onChange={(e) => setMatchStatus(e.target.value)}>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
            </select>

            <label> Update End Time: </label>
            <input 
                type="datetime-local" 
                name="end_datetime"
                value={endDatetime}
                onChange={(e) => setEndDatetime(e.target.value)} 
            />

            <br /><br />

            <button type="submit">Update Match</button>

        </form>
    );
}

export default UpdateMatch;