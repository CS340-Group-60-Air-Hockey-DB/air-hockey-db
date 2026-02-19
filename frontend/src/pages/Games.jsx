import React, { useState } from 'react';
import AddGame from '../components/AddGame';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function Games(props) {
    const { backendURL, locale, matches, sets, setUserLocation } = props
    const userLocation = useLocation()

    setUserLocation(userLocation)

    // sample data for this phase
    const [games, setGames] = useState([])

    useEffect(() => {
        const getGames = async () => {
            const res = await fetch(backendURL + '/games')
            const data = await res.json()

            setGames(data)
        }

        if(games?.length === 0){
            getGames()
        }
    }, [backendURL])

    return (
        <div className="page-container">
            <div>
                <h1>
                    Games
                </h1>
    
                <p>
                    Browse and manage individual games within sets. View game scores, status, and timing for each game. Add, edit, or remove games.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {
                            games?.length > 0 && Object.keys(games[0])?.map((header, idx) => {
                                let h = header
                                
                                if(header === 'match_id'){
                                    h = 'match'
                                }
                                if(header === 'set_id'){
                                    h = 'set_num'
                                }
                                if(header === 'game_num'){
                                    h = 'game_number'
                                }

                                return (
                                    <th key={`${header}-${idx}`}>
                                        { cap_words(h) }
                                    </th>
                                )
                            })
                        }
                        { games?.length > 0 && 
                            <th>
                                Actions
                            </th>    
                        }
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, idx) => {
                        let game_row = game
                        delete game_row.game_id

                        game_row.start_datetime = game.start_datetime ? new Date(game.start_datetime).toLocaleDateString(locale, { 
                            hour: "numeric",
                            minute: "numeric"
                        }) : null
                            
                        game_row.end_datetime = game.end_datetime ? new Date(game.end_datetime).toLocaleDateString(locale, {
                            hour: "numeric",
                            minute: "numeric"
                        }) : null

                        return <TableRow 
                            key={`game-${idx}`} 
                            rowObject={game_row} 
                            backendURL={backendURL} 
                        />
                    })}
                </tbody>
            </table>

            <hr />

            <AddGame matches={matches} sets={sets} />
        </div>
    );
}

export default Games;