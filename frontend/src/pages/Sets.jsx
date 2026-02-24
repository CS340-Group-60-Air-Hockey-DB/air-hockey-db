import { useMemo } from 'react';
import AddSet from '../components/forms/sets/AddSet';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    match_id: 'match',
    start_datetime: 'start_time',
    end_datetime: 'end_time',
    set_num: 'set_number'
}


function Sets(props) {
    const { backendURL, locale, matches, sets } = props
    
    const headers = useMemo(() => {
            if (!sets?.length) return []
    
            return Object.keys(sets[0]).filter(header => header !== 'set_id')
        }, [sets]);
    
        const rows = useMemo(() => {
            if(!sets?.length) return []
    
           return sets.map(set => {
                const { set_id, ...rest } = set

                return {
                    ...rest,
                    start_datetime: rest.start_datetime
                        ? new Date(rest.start_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                        : null,
                    end_datetime: rest.end_datetime
                        ? new Date(rest.end_datetime).toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric' })
                        : null
                }
            })
        }, [sets, locale])

    return (
        <div className="page-container">
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
                    { rows.map((set, idx) => {
                        return <TableRow
                            key={idx}
                            rowObject={set}
                            backendURL={backendURL}
                            deleteBtn={true}
                        />
                    })}
                </tbody>
            </table>

            <hr />

            <AddSet matches={matches} backendURL={backendURL} />

        </div>
    );
}

export default Sets;