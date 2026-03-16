import { useMemo, useState } from 'react';
import AddMatchOfficial from '../components/forms/match_officials/AddMatchOfficial';
import EditMatchOfficial from '../components/forms/match_officials/EditMatchOfficial';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    name: 'official_name',
    match_num: 'match_number',
    set_num: 'set_number',
    official_type: 'role'
}


function MatchOfficials(props) {
    const { backendURL, matches, matchOfficials, people, sets, refreshData } = props;
    
    // track which row is being edited
    const [editingOfficial, setEditingOfficial] = useState(null);

    // define which backend IDs to hide from table UI
    const hiddenColumns = ['match_official_id', 'official_person_id', 'set_id', 'match_id'];

    // Memoize headers + rows
    // Will only recalculate if the match officials table in the backend changes
    // Makes getting the table headers more efficient
    const headers = useMemo(() => {
        if(!matchOfficials?.length) return []
            
        return Object.keys(matchOfficials[0]).filter(header => !hiddenColumns.includes(header));
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
                    {matchOfficials?.map((official, idx) => {
                        return <TableRow
                            key={idx}
                            rowObject={official}
                            backendURL={backendURL}
                            deleteBtn={true}

                            onEdit={() => setEditingOfficial(official)}

                            refreshData={refreshData}
                            hiddenColumns={hiddenColumns}
                       />

                    })}
                </tbody>
            </table>
            
            <hr />

            {/* conditionally render either edit form or add form */}
            {editingOfficial ? (
                <EditMatchOfficial
                    backendURL={backendURL}
                    people={people}
                    matches={matches}
                    sets={sets}
                    matchOfficial={editingOfficial}
                    onUpdate={refreshData}
                    onCancel={() => setEditingOfficial(null)}
                />
            ) : (
                <AddMatchOfficial
                    backendURL={backendURL}
                    people={people}
                    matches={matches}
                    sets={sets}
                    onAdd={refreshData}
                />
            )}

        </div>
    )
}

export default MatchOfficials;