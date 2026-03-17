// Common enum values
const game_max_arr = [1, 2, 3, 4, 5, 6, 7]
const game_status_arr = ['scheduled', 'in_progress', 'completed', 'abandoned']
const gender_arr = ['female', 'male', 'other', 'prefer not to say']
const faceoff_type_arr = ['standard', 'puck flip']
const match_status_arr = ['scheduled', 'in_progress', 'completed', 'abandoned']
const match_type_arr = ['challenge', 'tournament', 'league', 'other']
const official_type_arr = ['referee', 'witness']
const player_order_arr = ['player_1', 'player_2']
const set_max_arr = [3, 5, 7]
const set_status_arr = ['scheduled', 'in_progress', 'completed', 'abandoned']
const starting_side_arr = ['left', 'right']
const type_of_address_arr = ['residential', 'commercial', 'club', 'bar', 'other']

// Initial Form Values
const initGame = {
    match_id: '',
    set_id: '',
    set_num: '',
    game_num: '',
    player_1_score: 0,
    player_2_score: 0,
    game_status: 'scheduled',
    start_datetime: null,
    end_datetime: null
}


export {
    game_max_arr,
    game_status_arr,
    gender_arr,
    faceoff_type_arr,
    initGame,
    match_status_arr,
    match_type_arr,
    official_type_arr,
    player_order_arr,
    set_max_arr,
    set_status_arr,
    starting_side_arr,
    type_of_address_arr
}