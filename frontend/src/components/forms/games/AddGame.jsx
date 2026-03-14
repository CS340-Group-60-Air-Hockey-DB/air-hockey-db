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
                </div>

                <div 
                    id='modal-p-div'
                    className='modal-p-div-overflow'
                >
                    <p>
                        Fill in the details below by scrolling to add a new game to any match.
                    </p>

                    <p>
                        If you do not see a match, all games have been added for all sets. Please use the update button if you need to change a game&apos;s details.
                    </p>

                    <p>
                        Any fields with 
                        <span className="asterisk"> * </span> 
                        are required.
                    </p>
                </div>

                <form 
                    id="add-game-form"
                    className='cuForm'
                    // onSubmit={handleSubmit}
                    // Disable the forms auto validation for scrolling in the handleSubmit function above
                    noValidate
                >
                    <div className="section">
                        <div className="form-row init-select">
                            <label 
                                htmlFor="match_id"
                                className='section-label'
                            >
                                Select a match
                                <span className="asterisk">*</span>
                            </label>

                            <select 
                                required
                                onChange={handleSelectMatch}
                            >
                                <option value="">
                                    To add a game, select a match
                                </option>
                                {
                                    matches.map(m => 
                                        <option 
                                            key={m.match_id} 
                                            value={m.match_id}
                                        >
                                            {m.match_id}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    {
                        matchId && 
                        <>
                            {/* Select Set + Game Number */}
                            <div className="section">
                                <div className="form-row">
                                    <label> 
                                        Set 
                                    
                                        <select required>
                                            <option value="">{'Select a Set'}</option>
                                            {setArr.map((num, idx) => <option key={idx} value={num}>{num}</option>)}
                                        </select>
                                    </label>

                                    <label>
                                        Game Number 
                                    
                                        <select required>
                                            <option value="">{'Select the Game Number'}</option>
                                                {gameNumArr.map((num, idx) => <option key={idx} value={num}>{num}</option>)}
                                        </select>
                                    </label>
                                </div>
                            </div>

                            {/* Player Scores */}
                            <div className="section">
                                <div className="form-row">
                                    <label
                                        htmlFor='player_1_score'
                                    >
                                        Player 1 Score
                                    
                                        <input 
                                            type="number" 
                                            name='player_1_score'
                                            placeholder='Enter Score'
                                            min="0" 
                                            max="7"
                                            required 
                                        />
                                    </label>

                                    <label
                                        htmlFor='player_2_score'
                                    >
                                        Player 2 Score

                                        <input 
                                            type="number" 
                                            name='player_2_score'
                                            placeholder='Enter Score'
                                            min="0" 
                                            max="7"
                                            required 
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Game Status */}
                            <div className="section">
                                <div className="form-row">
                                    <label> 
                                        Game Status
                                    
                                        <select required>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                    
                            <div id="modal-btn-row">
                                <button 
                                    type="submit"
                                >
                                    Add Game
                                </button>
                            </div>
                        </>
                    }

                    {/* If sets cannot be found for the match with the selected id */}
                    {/* {
                        matchId && setArr.length === 0 && alert(`Match ${matchId} and/or the set max could not be found. Please refresh and try again.`)
                    } */}
                </form>  
            </div>
        </div>
    );
}

export default AddGame;

