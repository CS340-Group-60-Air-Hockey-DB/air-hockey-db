import { useState } from 'react';

function AddGame(props) {
    const { backendURL, games, matches, refreshData, setAddModal } = props

    const [matchNum, setMatchNum] = useState(null)
    const [setMax, setSetMax] = useState(null)
    const gameNumArr = Array.from({ length: 7}, (_, idx) => idx + 1)
    
    return (
        <div 
            id="backdrop"
            // The onClick allows for the form modal to be exited if the user clicks outside of the modal
            onClick={evt => {
                if(evt.target === evt.currentTarget){
                    setAddModal(false)
                }
            }}
        >
            <div className="modals">
                <div id="modal-header">
                    <button 
                        id="modal-cancel"
                        onClick={() => setAddModal(false)}
                    >
                        X
                    </button>

                    <h2>Add a New Game</h2>

                    <p>
                        Fill in the details below by scrolling to add a new game to any match.
                    </p>
                    <p>
                        Any fields with <span className="asterisk">*</span> are required.
                    </p>
                </div>

                <form 
                    id="add-game-form"
                    className='cuForm'
                    // onSubmit={handleSubmit}
                    // Disable the forms auto validation for scrolling in the handleSubmit function above
                    noValidate
                >

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
            </div>
        </div>
    );
}

export default AddGame;

