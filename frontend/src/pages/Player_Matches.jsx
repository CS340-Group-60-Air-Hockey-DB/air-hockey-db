import { useState, useMemo } from 'react';
import AddPlayerToMatch from '../components/forms/player_matches/AddPlayerToMatch';
import EditPlayerMatch from '../components/forms/player_matches/EditPlayerMatch';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    match_id: 'match'
}


function PlayerMatches(props) {
    const { backendURL, matches, people, playerMatches, refreshData } = props

    const [editingMatch, setEditingMatch] = useState(null);

    const headers = useMemo(() => {
        if(!playerMatches?.length) return []
        return Object.keys(playerMatches[0])
    }, [playerMatches])
        
    const rows = useMemo(() => {
        if(!playerMatches?.length) return []
        return playerMatches.map(pm => ({
            ...pm,
            player_order: pm.player_order ? cap_words(pm.player_order) : pm.player_order
        }))
    }, [playerMatches])
    
    return (
        <div className="page-container">
            <div>
                <h1>Player Matches</h1>
                <p>
                    View player participation in matches. See which players competed in each match, their starting positions, match scores, and outcomes. Add, edit, or remove player-match records.
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {
                            headers.map((header, idx) => (
                                <th key={`header-${idx}`}>
                                    {cap_words(header_map[header] ?? header)}
                                </th>
                            ))
                        }
                        { headers.length > 0 && <th>Actions</th> }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((pm, idx) => {
                            return (
                                <TableRow
                                    key={idx}
                                    rowObject={pm}
                                    backendURL={backendURL}
                                    deleteBtn={true}
                                    refreshData={refreshData}
                                    onEdit={() => setEditingMatch(pm)}
                                />
                            )
                        }
                    )}
                </tbody>
            </table>

            <hr />

            {editingMatch ? (
                <EditPlayerMatch
                    backendURL={backendURL}
                    matches={matches}
                    people={people}
                    playerMatch={editingMatch}
                    onUpdate={refreshData}
                    onCancel={() => setEditingMatch(null)}
                />
            ) : (
                <AddPlayerToMatch
                    backendURL={backendURL}
                    matches={matches}
                    people={people}
                    onAdd={refreshData}
                />
            )}
        </div>
    )
}

export default PlayerMatches;
