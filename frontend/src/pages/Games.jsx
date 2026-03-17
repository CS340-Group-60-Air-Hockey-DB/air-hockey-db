import { useMemo, useState } from 'react';

import AddGame from '../components/forms/games/AddGame';
import TableRow from '../components/TableRow';
import UpdateGame from '../components/forms/games/UpdateGame';

import cap_words from '../functions/cap_words';

import { initGame } from '../common_variables';


const header_map = {
    match_id: 'match',
    set_num: 'set_number',
    game_num: 'game_number',
}


function Games(props) {
    const { backendURL, games, locale, matches, refreshData } = props

    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [editGame, setEditGame] = useState(initGame)


    {/*   Citation for Use of AI Tools: See file "citations/gamesTableMapArray.md"   */}
    // Memoize headers + rows
    // Will only recalculate if the games table in the backend changes
    // Makes getting the table headers more efficient
    const headers = useMemo(() => {
        if(!games?.length) return []

        return Object.keys(games[0]).filter(header => header !== 'game_id' && header !== 'set_id')
    }, [games])

    const rows = useMemo(() => {
        if(!games?.length) return []

        return games?.map(game => {
            // game_id + set_id will not show up in table
            const { game_id, set_id, ...rest } = game;
            
            return {
            ...rest,
            start_datetime: rest.start_datetime
                ? new Date(rest.start_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                : null,
            end_datetime: rest.end_datetime
                ? new Date(rest.end_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                : null
            };
        });
    }, [games, locale])


    return (
        <div id='page-styles'>
            <div>
                <h1>
                    Games
                </h1>
    
                <p>
                    Browse and manage individual games within sets. View game scores, status, and timing for each game. Add, edit, or remove games.
                </p>
            </div>

            <div id='table-div'>
                {/*   Citation for Use of AI Tools: See file "citations/gamesTableMapArray.md"   */}
                <table className="data-table">
                    <thead>
                        <tr>
                            {
                                headers.map((header, idx) => (
                                    <th key={`${header}-${idx}`}>
                                        { cap_words(header_map[header] ?? header) }
                                        </th>
                                ))
                            }
                            { games?.length > 0 && 
                                <th>
                                    Actions
                                </th>    
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((game, idx) => {
                            // Filter based on values that together can only be 1 game
                            // game_id + set_id were filtered out, and this is used to get the full game's data for the update form
                            let full_game = games.filter(g => 
                                g.set_num == game.set_num && 
                                g.match_id == game.match_id && 
                                g.game_num == game.game_num && 
                                g.game_status == game.game_status
                            )

                            return <TableRow 
                                key={`game-${idx}`} 
                                rowObject={game} 
                                objectId={full_game.game_id}
                                backendURL={backendURL} 
                                refreshData={refreshData}
                                deleteBtn={true}
                                editDisabled={game.game_status === 'abandoned'}
                                onEdit={() => {
                                    setUpdateModal(true)
                                    setEditGame(full_game?.[0] ?? initGame)
                                }}
                            />
                        })}
                    </tbody>
                </table>
            </div>

            <div id='btn-row'>
                <button
                    id='add-game'
                    className='default-btn'
                    onClick={() => setAddModal(true)}
                >
                    Add Game
                </button>
            </div>


            {
                addModal && 
                    <AddGame 
                        backendURL={backendURL}
                        matches={matches} 
                        refreshData={refreshData}
                        setAddModal={setAddModal}
                    />
            }  

            {
                updateModal && 
                <UpdateGame
                    backendURL={backendURL}
                    editGame={editGame}
                    refreshData={refreshData}
                    setEditGame={setEditGame}
                    setUpdateModal={setUpdateModal}
                />
            }
        </div>
    );
}

export default Games;