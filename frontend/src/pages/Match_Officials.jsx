import { useMemo } from 'react';
import AddMatchOfficial from '../components/forms/match_officials/AddMatchOfficial';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    match_num: 'match_number',
    set_num: 'set_number'
}


function MatchOfficials(props) {
    const { backendURL, matches, matchOfficials, people } = props

    // Memoize headers + rows
    // Will only recalculate if the match officials table in the backend changes
    // Makes getting the table headers more efficient
    const headers = useMemo(() => {
        if(!matchOfficials?.length) return []
            
        return Object.keys(matchOfficials[0]).filter(header => header !== 'match_official_id')
    }, [matchOfficials])
            
    const rows = useMemo(() => {
        if(!matchOfficials?.length) return []
        
        return matchOfficials?.map(official => {
            // match_official_id will not show up in table
            const { match_official_id, ...rest } = official
                        
            return { ...rest }
        });
    }, [matchOfficials])

    return (
        <div className="page-container">
            <div>
                <h1>
                    Match Officials
                </h1>
                <p>
                    Browse and manage referees and witnesses assigned to sets. Track official assignments and roles. Add, edit, or remove official records.
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
                        { matchOfficials?.length > 0 && <th>Actions</th> }
                    </tr>
                </thead>

                <tbody>
                    {rows.map((mo, idx) => {
                        return <TableRow
                            key={idx}
                            rowObject={mo}
                            backendURL={backendURL}
                            deleteBtn={true}
                       />
                    })}
                </tbody>
            </table>
            
            <hr />

            <AddMatchOfficial people={people} matches={matches} />

        </div>
    )
}

export default MatchOfficials;