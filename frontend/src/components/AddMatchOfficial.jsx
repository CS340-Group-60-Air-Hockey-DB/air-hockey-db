import { useState } from "react";

function AddMatchOfficial({ people, matches }) {
    const [matchNum, setMatchNum] = useState(null)
    const [setMax, setSetMax] = useState(null)

    return (
        <form id="add-form">
            <h2>Add a Match Official</h2>

            <label>Person: </label>
            <select required>
                <option value="">Select an Official</option>
                {people.map(p => <option key={p.person_id} value={p.person_id}>{p.first_name + ' ' + p.last_name}</option>)}
            </select>

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