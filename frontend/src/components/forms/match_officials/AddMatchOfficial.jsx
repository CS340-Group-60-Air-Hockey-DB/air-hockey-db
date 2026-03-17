import { useState } from "react";

function AddMatchOfficial({ backendURL, people, matches, sets, onAdd }) {
    const [officialPersonId, setOfficialPersonId] = useState('');
    const [matchId, setMatchId] = useState('');
    const [setId, setSetId] = useState('');
    const [officialType, setOfficialType] = useState('referee');

    // filter the sets for the selected match
    const filteredSets = sets ? sets.filter(s => s.match_id == matchId) : [];
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMatchOfficial = {
            official_person_id: officialPersonId,
            set_id: setId,
            official_type: officialType
        };

        try {
            const response = await fetch(`${backendURL}/match_officials`, {
                method: 'POST',
                headers: { 'Content-Type':  'application/json' },
                body: JSON.stringify(newMatchOfficial),
            });

            if (response.ok) {
                alert("Match Official added successfully.");
                onAdd(); // refresh table

                // clear form
                setOfficialPersonId('');
                setMatchId('');
                setSetId('');
                setOfficialType('referee');
            } else {
                alert("Failed to add match official.");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <form id="add-form" onSubmit={handleSubmit}>
            <h2>Add a Match Official</h2>

            <label>Person: </label>
            <select required value={officialPersonId} onChange={(e) => setOfficialPersonId(e.target.value)}>
                <option value="" disabled>Select an Official</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

            <label> Match: </label>
                <select 
                    required
                    value={matchId}
                    onChange={e => {
                        setMatchId(e.target.value);
                        setSetId('');
                    }}
                >
                    <option value="" disabled>Select a Match</option>
                    {matches.map(m => <option key={m.match_id} value={m.match_id}>Match {m.match_id}</option>)}
                </select>
                
                {matchId && (
                    <div>
                        <label> Set: </label>
                        <select required value={setId} onChange={(e) => setSetId(e.target.value)}>
                            <option value="" disabled>Select a Set</option>
                            {filteredSets.map(s => (
                                <option key={s.set_id} value={s.set_id}>Set {s.set_num}</option>
                            ))}
                        </select>
                    </div>
                )}

            <label> Role: </label>
            <select required value={officialType} onChange={(e) => setOfficialType(e.target.value)}>
                <option value="referee">Referee</option>
                <option value="witness">Witness</option>
            </select>

            <button type="submit">Add Match Official</button>
        </form>
    );
}

export default AddMatchOfficial;