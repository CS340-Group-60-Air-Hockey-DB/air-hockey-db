import AddGame from '../components/AddGame';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';
import { useMemo } from 'react';

function Games(props) {
    const { backendURL, games, locale, matches } = props

{/*   Citation for Use of AI Tools: See file "citations/gamesTableMapArray.md"   */}
    const header_map = {
        match_id: 'match',
        set_id: 'set_number',
        game_num: 'game_number'
    }

    // Memoize headers + rows
    // Will only recalculate if the games table in the backend changes
    // Makes getting the table headers more efficient
    const headers = useMemo(() => {
        if(!games?.length) return []

        return Object.keys(games[0]).filter(header => header !== 'game_id')
    }, [games])

    const rows = useMemo(() => {
        if(!games?.length) return []

        return games?.map(game => {
            // game_id will not show up in table
            const { game_id, ...rest } = game;
            
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
        <div className="page-container">
            <div>
                <h1>
                    Games
                </h1>
    
                <p>
                    Browse and manage individual games within sets. View game scores, status, and timing for each game. Add, edit, or remove games.
                </p>
            </div>

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
                        return <TableRow 
                            key={`game-${idx}`} 
                            rowObject={game} 
                            backendURL={backendURL} 
                            deleteBtn={true}
                        />
                    })}
                </tbody>
            </table>

            <hr />

            <AddGame matches={matches} />
        </div>
    );
}

export default Games;