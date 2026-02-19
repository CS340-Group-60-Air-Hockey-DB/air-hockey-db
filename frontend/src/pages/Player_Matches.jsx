import { useState } from 'react';
import AddPlayerToMatch from '../components/AddPlayerToMatch';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function PlayerMatches(props) {
    const { backendURL, matches, people, setUserLocation } = props
    const userLocation = useLocation()

    setUserLocation(userLocation)

    // sample data for this phase
    const [playerMatches, setPlayerMatches] = useState([]);


    useEffect(() => {
        const all_player_matches = async () => {
            try{
                const res = await fetch(backendURL + '/player_matches')

                const data = await res.json()

                setPlayerMatches(data)
            }
            catch(error){
                console.log('Error:', error)
            }
        }

        if(playerMatches?.length === 0){
            all_player_matches()
        }
    }, [backendURL])

    
    return (
        <div className="page-container">
            <div>
                <h1>
                    Player Matches
                </h1>
                <p>
                    View player participation in matches. See which players competed in each match, their starting positions, match scores, and outcomes. Add, edit, or remove player-match records.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {
                            playerMatches?.length > 0 && Object.keys(playerMatches[0])?.map((header, idx) => {
                                return ( 
                                    <th key={`header-${idx}`}>
                                        { cap_words(header)}
                                    </th>
                                )
                            })
                        }
                        { playerMatches?.length > 0 && <th>Actions</th> }
                    </tr>
                </thead>
                <tbody>
                    {playerMatches.map((pm, idx) => {
                        let pm_row = pm
                        if(pm.player_order){
                            pm_row.player_order = cap_words(pm.player_order)
                        }

                        return <TableRow key={idx} rowObject={pm} backendURL={backendURL} />
                    })}
                </tbody>
            </table>

            <hr />

            <AddPlayerToMatch matches={matches} people={people} />
            
        </div>
    )
}

export default PlayerMatches;
