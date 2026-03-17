import { useState, useEffect } from "react";

function EditSet({ matches, people, backendURL, refreshData, setToEdit, closeEdit }) {
    const [matchId, setMatchId] = useState("");
    const [setNum, setSetNum] = useState("");
    const [status, setStatus] = useState("Scheduled");
    const [winnerId, setWinnerId] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");

    const [setMaxArray, setSetMaxArray] = useState(null);

    // format DB dates for local datetime
    const toLocalDatetimeInput = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    // pre-fill form when set is clicked
    useEffect(() => {
        if (setToEdit) {
            setMatchId(setToEdit.match_id || "");
            setWinnerId(setToEdit.winner_id || "");
            setSetNum(setToEdit.set_num || "");
            setStatus(setToEdit.status || "Scheduled");
            setStartDatetime(toLocalDatetimeInput(setToEdit.startDatetime));
            setEndDatetime(toLocalDatetimeInput(setToEdit.end_datetime));

            const selectedMatch = matches.find(m => m.match_id === parseInt(setToEdit.match_id));
            if (selectedMatch) {
                setSetMaxArray(Array.from({ length: selectedMatch.set_max }, (_, idx) => idx + 1));
            }
        }
    }, [setToEdit, matches]);

    const handleMatchChange = (evt) => {
        const selectedMatchId = evt.target.value;
        setMatchId(selectedMatchId);
        setSetNum("");

        if (selectedMatchId) {
            const selectedMatch = matches.find(m => m.match_id === parseInt(selectedMatchId));
            if (selectedMatch) {
                setSetMaxArray(Array.from({ length: selectedMatch.set_max }, (_, idx) => idx + 1));
            }
        } else {
            setSetMaxArray(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSet = {
            match_id: matchId,
            winner_id: winnerId,
            set_num: setNum,
            set_status: status,
            start_datetime: startDatetime,
            end_datetime: endDatetime
        };

        try {
            const response = await fetch(`${backendURL}/sets/${setToEdit.set_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSet)
            });

            if (response.ok) {
                alert("Set updated successfuly.");
                if (refreshData) refreshData();
                closeEdit();
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update set.");
            }
        } catch (error) {
            alert("A network error occurred.");
        }
    };

    if (!setToEdit) return null;

    return (
        <form id="update-form" onSubmit={handleSubmit}>
            <h2>Edit Set {setToEdit.set_id}</h2>

            <label> Match: </label>
                <select required value={matchId} onChange={handleMatchChange}>
                    <option value="">Select a Match</option>
                    {matches.map(m =>
                        <option key={m.match_id} value={m.match_id}>
                            Match {m.match_id}
                        </option>
                    )}
                </select>

            {setMaxArray && (
                <div>
                    <label> Set: </label>
                    <select required value={setNum} onChange={(e) => setSetNum(e.target.value)}>
                        <option value="">Select a Set</option>
                        {setMaxArray.map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            )}

            <label> Status: </label>
            <select required value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <label> Winner (Optional): </label>
            <select value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
                    <option value="">-- None Yet --</option>                
                    {people.map(p =>
                        <option key={p.person_id} value={p.person_id}>
                            {p.first_name} {p.last_name}
                        </option>
                    )}
            </select>

            <label> Start Date & Time: </label>
            <input 
                type="datetime-local" 
                value={startDatetime} 
                onChange={(e) => setStartDatetime(e.target.value)} 
            />

            <label> End Date & Time: </label>
            <input 
                type="datetime-local" 
                value={endDatetime} 
                onChange={(e) => setEndDatetime(e.target.value)} 
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeEdit}>Cancel</button>
            </div>
        </form>  
    );
}

export default EditSet;