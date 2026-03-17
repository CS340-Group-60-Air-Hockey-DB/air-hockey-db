import { useEffect, useState } from 'react';

import cap_words from '../../../functions/cap_words';

import { game_status_arr, initGame } from '../../../common_variables';

import getInputDatetime from '../../../functions/input_datetime';
import updateGame from '../../../fetch_funcs/games/updateGame';
import getAllGameSetsByMatchId from '../../../fetch_funcs/games/getAllGameSetsByMatchId';


function UpdateGame(props) {
    const { backendURL, editGame, refreshData, setEditGame, setUpdateModal } = props

    const [setStatus, setSetStatus] = useState('')

    useEffect(() => {
        const getMatchDetails = async () => {
            let { match_details, status } = await getAllGameSetsByMatchId(backendURL, editGame.match_id)

            if(status === 200){
                const active_sets = match_details?.filter(set =>
                    set.set_id == editGame.set_id
                ) ?? []

                setSetStatus(active_sets[0].set_status)
            }
            else{
                setSetStatus('')
            }
        }

        getMatchDetails()
    }, [backendURL, editGame.match_id])
    
    const handleInputOnChange = (evt) => {
        evt.preventDefault()
        let { name, value } = evt.target

        if(name === 'player_1_score' || name === 'player_2_score'){
            if(value === '' || value === null){
                return setEditGame({...editGame, [name]: 0})
            }
            else{
                return setEditGame({...editGame, [name]: parseInt(value)})
            }
        }
        if(name.includes('datetime')){
            value = new Date(value).toISOString()
        }

        setEditGame({
            ...editGame,
            [name]: value
        })
    }

    // Needed because the form's automatic form validation + scrolling, does not show the use the input field that is invalid due to the header being sticky
    const handleBlankInput = () => {
            // Scroll to the first required blank input
            const form = document.getElementById('update-game-form')
            const firstInvalidInput = form.querySelector(':invalid')
    
            if(firstInvalidInput){
                const modal = document.querySelector('.modals')
                const header = document.getElementById('modal-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementTop = firstInvalidInput.getBoundingClientRect().top 
                             + modal.scrollTop 
                             - modal.getBoundingClientRect().top
    
                modal.scrollTo({
                    top: elementTop - headerHeight - 16,
                    behavior: 'smooth'
                })
    
                // Wait for the scrolling to the required input field finishes
                // Then show the validation tooltip
                setTimeout(() => {
                    firstInvalidInput.focus()
                    firstInvalidInput.reportValidity();
                }, 300)
                return true
            }
    
            return false
    }
    
    const handleSubmit = async (evt) => {
            evt.preventDefault()

            // Calls the function + handles if the function returns true (an invalid input)
            if(handleBlankInput()){
                return
            }
    
            let game_res = await updateGame(backendURL, editGame)
    
            if(game_res.status === 201){
                alert(`Game ${editGame.game_num} in set ${editGame.set_num} for match ${editGame.match_id} was updated.`)

                setEditGame({})
                setUpdateModal(false)
                refreshData()
            }
            else{
                alert(`The game was not able to be updated to the database:\n${game_res.error} \n\nPlease try again or contact the administrator.`)
            }
    }


    return (
        <div 
            id="backdrop"
            // The onClick allows for the form modal to be exited if the user clicks outside of the modal
            onClick={evt => {
                if(evt.target === evt.currentTarget){
                    setUpdateModal(false)
                    setEditGame(initGame)
                }
            }}
        >
            <div className="modals">
                <div id="modal-header">
                    <button 
                        id="modal-cancel"
                        onClick={() => {
                            setUpdateModal(false)
                            setEditGame(initGame)
                        }}
                    >
                        X
                    </button>

                    <h2>
                        {`Update Match ${editGame.match_id} Set ${editGame.set_num} Game ${editGame.game_num}`}
                    </h2>
                </div>

                <div 
                    id='modal-p-div'
                    className='modal-p-div-overflow'
                >
                    <p>
                        Fill in the details below by scrolling to update the game.
                    </p>

                    <p>
                        Any fields with 
                        <span className="asterisk"> * </span> 
                        are required.
                    </p>
                </div>

                <form 
                    id="update-game-form"
                    className='cuForm'
                    onSubmit={handleSubmit}
                    // Disable the forms auto validation for scrolling in the handleSubmit function above
                    noValidate
                >
                    <div className="section">
                        <div className="form-row">
                            {
                                setStatus !== 'completed' ?
                                    <label
                                        htmlFor='game_status'
                                    > 
                                        Game Status
                                        <span className="asterisk"> * </span>

                                        <select 
                                            id='game_status'
                                            name='game_status'
                                            onChange={handleInputOnChange}
                                            value={editGame.game_status}
                                            required
                                        >
                                            {
                                                game_status_arr?.map((status, idx) => 
                                                    <option key={idx} value={status}>
                                                        {cap_words(status)}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </label>
                            : 
                                <>
                                    <p>
                                        The game status cannot be updated if the set status is "completed".
                                    </p>

                                    <p> 
                                        Game Status
                                    </p>

                                    <div className='select-style-div'>
                                        {cap_words(editGame.game_status)}
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                    {
                        editGame.game_status !== 'scheduled' && editGame.game_status !== 'abandoned' && 
                            <>
                                {/* Player Scores */}
                                <div className="game-section">
                                    <div className="form-row">
                                        <label
                                            htmlFor='player_1_score'
                                        >
                                            Player 1 Score
                                            <span className="asterisk"> * </span>
                                        
                                            <input 
                                                type="number" 
                                                id='player_1_score'
                                                name='player_1_score'
                                                placeholder='Enter Score'
                                                defaultValue={editGame?.player_1_score ?? 0}
                                                min="0" 
                                                max="7"
                                                onChange={handleInputOnChange}
                                                required 
                                            />
                                        </label>

                                        <label
                                            htmlFor='player_2_score'
                                        >
                                            Player 2 Score 
                                            <span className="asterisk"> * </span>
                                                            
                                            <input 
                                                type="number" 
                                                id='player_2_score'
                                                name='player_2_score'
                                                placeholder='Enter Score'
                                                defaultValue={editGame?.player_2_score ?? 0}
                                                min="0" 
                                                max="7"
                                                onChange={handleInputOnChange}
                                                required 
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Datetimes */}
                                <div className="game-section">
                                    <div className="form-row">
                                        <label
                                            htmlFor='start_datetime'
                                        > 
                                            Start Time
                                            {
                                                editGame.game_status !== 'abandoned' &&
                                                <span className="asterisk"> * </span>
                                            }
                                                            
                                            <input 
                                                type="datetime-local" 
                                                id="start_datetime"
                                                name="start_datetime"
                                                value={editGame?.start_datetime ? getInputDatetime(editGame.start_datetime) : ''}
                                                onChange={handleInputOnChange} 
                                                required={editGame.game_status !== 'abandoned'}
                                            />
                                        </label>
                                        
                                            {
                                                editGame.game_status !== 'in_progress' && 
                                                    <label
                                                        htmlFor='end_datetime'
                                                    > 
                                                        End Time
                                                    {
                                                            editGame.game_status !== 'in_progress' && 
                                                            editGame.game_status !== 'abandoned' &&
                                                            <span className="asterisk"> * </span>
                                                        }
                                                        <input
                                                            type="datetime-local" 
                                                            id="end_datetime"
                                                            name="end_datetime"
                                                            value={editGame?.end_datetime ? getInputDatetime(editGame.end_datetime) : ''}
                                                            onChange={handleInputOnChange} 
                                                            required={editGame.game_status !== 'in_progress' && editGame.game_status !== 'abandoned'}
                                                        />
                                                    </label>
                                            }
                                    </div>
                                </div>
                            </>
                    }
                    
                    <div id="modal-btn-row">
                        <button 
                            type="submit"
                        >
                            Update Game
                        </button>
                    </div>
                </form>  
            </div>
        </div>
    );
}

export default UpdateGame;

