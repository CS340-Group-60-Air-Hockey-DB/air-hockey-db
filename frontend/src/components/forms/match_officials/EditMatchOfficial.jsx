import { useState, useEffect } from "react";

function EditMatchOfficial({ backendURL, people, matches, sets, matchOfficial, onUpdate, onCancel }) {
    const [officialPersonId, setOfficialPersonId] = useState('');
    const [matchId, setMatchId] = useState('');
    const [setId, setSetId] = useState('');
    const [officialType, setOfficialType] = useState('');

    // pre-fill form when an official is selected for editing
    useEffect(() => {
        if (matchOfficial) {
            setOfficialPersonId(matchOfficial.official_person_id);
            setMatchId(matchOfficial.match_id);
            setSetId(matchOfficial.set_id);

            const rawType = matchOfficial.official_type ? matchOfficial.official_type.toLowerCase() : 'referee';
            setOfficialType(rawType);
        }
    }, [matchOfficial]);

    const filteredSets = sets ? sets.filter(s => s.match_id == matchId) : [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedOfficial = {
            official_person_id: officialPersonId,
            set_id: setId,
            official_type: officialType
        };

        try {
            const response = await fetch(`${backendURL}/match_officials/${matchOfficial.match_official_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOfficial),
            });

            if (response.ok) {
                alert("Match Official updated successfully!");
                onUpdate();
                onCancel();
            } else {
                alert("Failed to udpate match official.");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <form id="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Match Official</h2>

            <label>Person: </label>
            <select required value={officialPersonId} onChange={(e) => setOfficialPeresonId(e.target.value)}>
                <option value="" disabled>Select an Official</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

            <label> Match: </label>
            <select
                required
                value={matchId}
                onChange={(e) => {
                    setMatchId(e.target.value);
                    setSetId('');
                }}
            >
                <option value="" disabled>Select a MAtch</option>
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

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default EditMatchOfficial;