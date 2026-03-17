import { useState } from "react";

function AddSet({ matches, people, backendURL, refreshData }) {
    const [matchId, setMatchId] = useState("");
    const [setNum, setSetNum] = useState("");
    const [status, setStatus] = useState("Scheduled");
    const [winnerId, setWinnerId] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");

    const [setMaxArray, setSetMaxArray] = useState(null);

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

        const newSet = {
            match_id: matchId,
            winner_id: winnerId,
            set_num: setNum,
            set_status: status,
            start_datetime: startDatetime,
            end_datetime: endDatetime
        };

        try {
            const response = await fetch(`${backendURL}/sets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSet)
            });

            if (response.ok) {
                alert("Set added successfuly.");
                if (refreshData) refreshData();

                // clear the form
                setMatchId("");
                setSetNum("");
                setStatus("Scheduled");
                setWinnerId("");
                setStartDatetime("");
                setEndDatetime("");
                setSetMaxArray(null);
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to add set.");
            }
        } catch (error) {
            alert("A network error occurred.");
        }
    };

    return (
        <form id="add-form" onSubmit={handleSubmit}>
            <h2>Add a New Set</h2>

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
                <option value="Abandoned">Abandoned</option>
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

            <label> Start Date & Time (Optional): </label>
            <input 
                type="datetime-local" 
                value={startDatetime} 
                onChange={(e) => setStartDatetime(e.target.value)} 
            />

            <label> End Date & Time (Optional): </label>
            <input 
                type="datetime-local" 
                value={endDatetime} 
                onChange={(e) => setEndDatetime(e.target.value)} 
            />

            <button type="submit">Add Set</button>
        </form>  
    );
}

export default AddSet;