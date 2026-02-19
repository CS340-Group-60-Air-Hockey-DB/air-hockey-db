import { useState } from 'react';

function AddGame({ matches, sets }) {
    const [matchNum, setMatchNum] = useState(null)
    const [setMax, setSetMax] = useState(null)
    const gameNumArr = Array.from({ length: 7}, (_, idx) => idx + 1)
    
    return (
        <form id="add-form">
            <h2>Add a New Game</h2>

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

            <label>Game Number: </label>
                <select required>
                    <option value="">{'Select the Game Number'}</option>
                        {gameNumArr.map((num, idx) => <option key={idx} value={num}>{num}</option>)}
                    </select>

            <br /><br />

            <label>Player 1 Score: </label>
            <input 
                type="number" 
                min="0" 
                max="7"
                required 
            />

            <label>Player 2 Score:</label>
            <input type="number" min="0" max="7"required />

            <label> Status: </label>
            <select required>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button type="submit">Add Game</button>
        </form>  
    );
}

export default AddGame;

