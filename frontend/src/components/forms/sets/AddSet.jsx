import { useState } from "react";

function AddSet({ matches }) {
    const [matchNum, setMatchNum] = useState(null)
    const [setMax, setSetMax] = useState(null)

    return (
        <form id="add-form">
            <h2>Add a New Set</h2>

            <label> Match: </label>
                <select 
                    required
                    onChange={evt => {
                        setMatchNum(evt.target.value[0])
                        setSetMax(Array.from({ length: evt.target.value[2]}, (_, idx) => idx + 1))
                    }}
                >
                    <option value="">Select a Match</option>
                    {matches.map(m => 
                        <option 
                            key={m.match_id} 
                            value={[m.match_id, m.set_max]}
                        >
                            {m.match_id}
                        </option>
                    )}
                </select>

            {
                matchNum && setMax && 
                <div>
                    <label> Set: </label>
                        <select required>
                            <option value="">{'Select a Set'}</option>
                            {setMax.map((num, idx) => <option key={idx} value={num}>{num}</option>)}
                        </select>
                </div>
            }

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