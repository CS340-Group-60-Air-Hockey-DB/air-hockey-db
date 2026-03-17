import { useMemo, useState } from 'react';
import AddSet from '../components/forms/sets/AddSet';
import EditSet from '../components/forms/sets/EditSet';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    match_id: 'match',
    start_datetime: 'start_time',
    end_datetime: 'end_time',
    set_num: 'set_number'
}


function Sets(props) {
    const { backendURL, locale, matches, sets, people, refreshData } = props
    const [setRowToEdit, setSetRowToEdit] = useState(null);
    
    const headers = useMemo(() => {
            if (!sets?.length) return []
    
            return Object.keys(sets[0]).filter(header => header !== 'set_id')
        }, [sets]);
    
        const rows = useMemo(() => {
            if(!sets?.length) return []
    
           return sets.map(set => {
                const { set_id, ...rest } = set;

                return {
                    ...rest,
                    status: rest.status === 'in_progress' ? 'in progress' : rest.status,
                    start_datetime: rest.start_datetime
                        ? new Date(rest.start_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                        : null,
                    end_datetime: rest.end_datetime
                        ? new Date(rest.end_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                        : null
                }
            });
        }, [sets, locale]);

    return (
        <div id='page-styles'>
            <div>
                <h1>Sets</h1>

                <p>
                    Browse and manage sets within matches. View set numbers, winners, status, and timing. Add, edit, or remove sets.
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
                    { rows.map((rowObj, idx) => {
                        const fullSetData = sets[idx];

                        return <TableRow
                            key={fullSetData.set_id}
                            rowObject={rowObj}
                            objectId={fullSetData.set_id}
                            backendURL={backendURL}
                            deleteBtn={true}
                            refreshData={refreshData}
                            onEdit={() => setSetRowToEdit(fullSetData)}
                        />
                    })}
                </tbody>
            </table>

            <hr />

            {setRowToEdit ? (
                <EditSet
                    matches={matches} 
                    people={people}
                    backendURL={backendURL} 
                    refreshData={refreshData}
                    setToEdit={setRowToEdit}
                    closeEdit={() => setSetRowToEdit(null)}
                />
            ) : (
                <AddSet
                    matches={matches}
                    people={people}
                    backendURL={backendURL}
                    refreshData={refreshData}
                />
            )}
        </div>
    );
}

export default Sets;