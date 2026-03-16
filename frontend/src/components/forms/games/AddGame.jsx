import { useState } from 'react';

import addGame from '../../../fetch_funcs/games/addGame';
import getAllGameSetsByMatchId from '../../../fetch_funcs/games/getAllGameSetsByMatchId';
import cap_words from '../../../functions/cap_words';

import { game_max_arr, game_status_arr } from '../../../ common_variables';
import getInputDatetime from '../../../functions/input_datetime';

const initGame = {
    set_id: '', 
    set_num: '',
    game_num: '', 
    player_1_score: 0, 
    player_2_score: 0, 
    game_status: 'scheduled', 
    start_datetime: null, 
    end_datetime: null
}


function AddGame(props) {
    const { backendURL, matches, refreshData, setAddModal } = props

    // Set
    const [activeSets, setActiveSets] = useState([])

    // Game
    const [game, setGame] = useState({...initGame})
    const [gameNumArr, setGameNumArr] = useState(game_max_arr)


    const handleSelectMatch = async evt => {
        const { name, value } = evt.target
        
        const match_status = matches.filter(m => m.match_id == value )[0]?.match_status ?? ''

        // Reset Selects on Match Select Change
        setGame({
            ...initGame,
            [name]: value,
            match_status
        })

        if(value !== null && value !== ''){
            let { match_details, status } = await getAllGameSetsByMatchId(backendURL, value)

            if(status === 200){
                const active_sets = match_details?.filter(set =>
                    set.set_status === 'scheduled' || set.set_status === 'in_progress'
                ) ?? []

                setActiveSets(active_sets)
            }
            else if(status === 404){
                setGame({
                    ...game,
                    match_id: 'no sets added'
                })
            }
            else{
                setActiveSets([])
            }
        }
    }

    const handleSelectSet = async evt => {
        let { value } = evt.target
        let selectedSet

        if(value !== ''){
            selectedSet = activeSets.filter(set => set.set_num == value)[0]

            // Getting Games for Select
            if(selectedSet.games.length > 0 && selectedSet.games.length < 7){
                let added_games = []

                selectedSet.games.forEach(game => {
                    added_games.push(game.game_num)
                })

                let remaining_games = game_max_arr.filter(num => !added_games.includes(num))
                setGameNumArr(remaining_games)
            }
            else if(selectedSet.games.length === 7){
                return setGameNumArr('no games to add')
            }
            else{
                setGameNumArr(game_max_arr)
            }
        }
        
        setGame({
            ...game, 
            set_id: selectedSet?.set_id ?? '',
            set_num: value,
            game_num: value === '' ? '' : game.game_num,
            set_status: selectedSet?.set_status ?? ''
        })
    }

    const handleSelectGame = async evt => {
        const { value } = evt.target

        setGame({
            ...game, 
            game_num: value
        })
    }

    
    const handleInputOnChange = (evt) => {
        evt.preventDefault()
        let { name, value } = evt.target

        if(name === 'player_1_score' || name === 'player_2_score'){
            if(value === '' || value === null){
                return setGame({...game, [name]: 0})
            }
            else{
                return setGame({...game, [name]: parseInt(value)})
            }
        }
        if(name.includes('datetime')){
            value = new Date(value).toISOString()
        }
        if(name.includes('game_status')){
            return setGame({
                ...game,
                [name]: value,
                player_1_score: 0,
                player_2_score: 0,
                start_datetime: null,
                end_datetime: null
            })
        }

        setGame({
            ...game,
            [name]: value
        })
    }

    // Needed because the form's automatic form validation + scrolling, does not show the use the input field that is invalid due to the header being sticky
    const handleBlankInput = () => {
            // Scroll to the first required blank input
            const form = document.getElementById('add-game-form')
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
    
            let game_res = await addGame(backendURL, game)
    
            if(game_res.status === 201){
                alert(`The game for match ${game.match_id} and set ${game.set_id} was added.`)
                setGame({})
                setAddModal(false)
                refreshData()
            }
            else{
                alert(`The game was not able to be added to the database:\n${game_res.error} \n\nPlease try again or contact the administrator.`)
            }
    }


    return (
        <div 
            id="backdrop"
            // The onClick allows for the form modal to be exited if the user clicks outside of the modal
            onClick={evt => {
                if(evt.target === evt.currentTarget){
                    setAddModal(false)
                    setGame(initGame)
                }
            }}
        >
            <div className="modals">
                <div id="modal-header">
                    <button 
                        id="modal-cancel"
                        onClick={() => {
                            setAddModal(false)
                            setGame(initGame)
                        }}
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
                    onSubmit={handleSubmit}
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
                                <span className="asterisk"> * </span>
                            </label>

                            <select 
                                required
                                id='match_id'
                                name='match_id'
                                value={game.match_id}
                                onChange={handleSelectMatch}
                            >
                                <option value="">
                                    To add a game, select a match
                                </option>
                                {
                                    matches.filter(m => m.match_status !== 'abandoned' && m.match_status !== 'completed')
                                        .map(m => 
                                            <option 
                                                key={m.match_id} 
                                                value={m.match_id}
                                            >
                                                {m.match_id} - {cap_words(m.match_status)}
                                            </option>
                                        )
                                    })
                            </select>
                        </div>
                    </div>

                    {
                        // If there is a match id + sets to be played
                        game.match_id && game.match_id !== 'no sets added' && activeSets.length > 0 ?
                        <>
                            {/* Select Set + Game Number */}
                            <div className="game-section">
                                <div className={`form-row ${game.set_num === '' ? 'set-select' : ''}`}>
                                    <label
                                        htmlFor="set_num"
                                    > 
                                        Set 
                                        <span className="asterisk"> * </span>

                                        <select 
                                            onChange={handleSelectSet}
                                            id='set_num'
                                            name='set_num'
                                            value={game.set_num}
                                            required
                                        >
                                            <option value="">
                                                {'Select a Set'}
                                            </option>
                                            {
                                                activeSets.map((set, idx) => 
                                                    <option key={idx} value={set.set_num}>
                                                        {set.set_num}
                                                    </option>)
                                            }
                                        </select>
                                    </label>

                                {/* Select a Set, then Game Number Select will appear */}
                                {
                                    game.set_num !== '' && gameNumArr?.length > 0 &&
                                        <label
                                            htmlFor='game_num'
                                        >
                                            Game Number 
                                            <span className="asterisk"> * </span>

                                            <select 
                                                onChange={handleSelectGame}
                                                id='game_num'
                                                name='game_num'
                                                value={game.game_num}
                                                required
                                            >
                                                <option value="">
                                                    {'Select the Game Number'}
                                                </option>
                                                    {
                                                        gameNumArr.map((num, idx) => 
                                                            <option key={idx} value={num}>
                                                                {num}
                                                            </option>
                                                        )
                                                    }
                                            </select>
                                        </label>
                                }
                                </div>
                            </div>

                            {/* Game Status */}
                            { 
                                game.set_num !== '' && game.game_num !== '' &&
                                    <div className="game-section">
                                        <div className="form-row">
                                            <label
                                                htmlFor='game_status'
                                            > 
                                                Game Status
                                                <span className="asterisk"> * </span>

                                                <select 
                                                    id='game_status'
                                                    name='game_status'
                                                    onChange={handleInputOnChange}
                                                    required
                                                >
                                                    {
                                                        game_status_arr?.filter(status => {
                                                            if(game.match_status === 'scheduled'){
                                                                return status === 'scheduled'
                                                            }
                                                            return status !== 'abandoned'
                                                        })
                                                            .map((status, idx) => 
                                                                <option key={idx} value={status}>
                                                                    {cap_words(status)}
                                                                </option>
                                                            )
                                                    }
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                            }

                            {/* Set + Game numbers have been selected, show the rest of the form */}
                            {
                                game.set_num !== '' && game.game_num !== '' && game.game_status !== 'scheduled' &&
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
                                                    defaultValue={0}
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
                                                    defaultValue={0}
                                                    min="0" 
                                                    max="7"
                                                    onChange={handleInputOnChange}
                                                    required 
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="game-section">
                                        <div className="form-row">
                                            <label
                                                htmlFor='start_datetime'
                                            > 
                                                Start Time
                                                <span className="asterisk"> * </span>
                                                
                                                <input 
                                                    type="datetime-local" 
                                                    id="start_datetime"
                                                    name="start_datetime"
                                                    value={game?.start_datetime ? getInputDatetime(game.start_datetime) : ''}
                                                    onChange={handleInputOnChange} 
                                                    required
                                                />
                                            </label>

                                            {
                                                game.game_status !== 'in_progress' && 
                                                <label
                                                    htmlFor='end_datetime'
                                                > 
                                                    End Time
                                                    <span className="asterisk"> * </span>

                                                    <input 
                                                        type="datetime-local" 
                                                        id="end_datetime"
                                                        name="end_datetime"
                                                        value={game?.end_datetime ? getInputDatetime(game.end_datetime) : ''}
                                                        onChange={handleInputOnChange} 
                                                        required={game.game_status !== 'in_progress'}
                                                    />
                                                </label>
                                            }
                                        </div>
                                    </div>
                                </>
                            }

                            {/* If game Number is selected show button */}
                            {
                                game.set_num !== '' && game.game_num !== '' &&
                                <div id="modal-btn-row">
                                    <button 
                                        type="submit"
                                    >
                                        Add Game
                                    </button>
                            </div>
                            }
                        </>
                        :
                        // If there is a match id and there are no sets to be played:
                        game.match_id && game.match_id !== 'no sets added' && activeSets.length === 0 ?
                        <>
                            <div className="section">
                                <div className="form-row-p-div">
                                    <p>
                                        The match has ended and cannot have a game added to it.
                                    </p>

                                    <p>
                                        If you need to change a game&apos;s details, you can <b><i>update</i></b> the game.
                                    </p>
                                </div>
                            </div>
                        </>
                        :
                        // If the match is in progress and there are no sets:
                        game.match_id === 'no sets added' &&
                        <>
                            <div className="section">
                                <div className="form-row-p-div">
                                    <p>
                                        The match doesn&apos;t have any sets added to it.
                                    </p>

                                    <p>
                                        Add sets in the Sets page, then come back to add a game.
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </form>  
            </div>
        </div>
    );
}

export default AddGame;

