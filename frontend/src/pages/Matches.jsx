import { useMemo } from 'react';
import AddMatch from '../components/forms/matches/AddMatch';
import UpdateMatch from '../components/forms/matches/UpdateMatch';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    match_id: 'match',
    start_datetime: 'start_time',
    end_datetime: 'end_time',
    winner_id: 'winner'
}


function Matches(props) {
    const { backendURL, locale, locations, matches, people } = props

    const headers = useMemo(() => {
        if (!matches?.length) return []

        return Object.keys(matches[0])
    }, [matches]);

    const rows = useMemo(() => {
        if(!matches?.length) return []

        return matches.map(match => ({
            ...match,
            start_datetime: match.start_datetime
                ? new Date(match.start_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                : null,
            end_datetime: match.end_datetime
                ? new Date(match.end_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                : null
        }))

    }, [matches, locale])

    
    return (
        <div className="page-container">
            <div>
                <h1>Air Hockey Matches</h1>
                
                <p>
                    Browse and manage competitive matches. View match details including location, type, status, and winner. Add, edit, or remove matches.
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
                        rows.map((match, index) => {
                            return (
                                <TableRow 
                                    key={`match-${index}`} 
                                    rowObject={match} 
                                    backendURL={backendURL} 
                                    deleteBtn={true}
                                />
                            )
                        })
                    }
                </tbody>
            </table>

            <hr />

            <AddMatch locations={locations} />
            
            <hr />

            <UpdateMatch 
                matches={matches} 
                locations={locations} 
                backendURL={backendURL} 
            />

        </div>
    )
}

export default Matches;