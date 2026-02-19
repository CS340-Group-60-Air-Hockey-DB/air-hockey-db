import AddSet from '../components/AddSet';
import { useLocation } from 'react-router-dom';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';

function Sets(props) {
    const { backendURL, locale, matches, sets, setUserLocation } = props
    const userLocation = useLocation()

    setUserLocation(userLocation)

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
                            sets?.length > 0 && Object.keys(sets[0])?.map((header, idx) => {
                                let h = header
                                if(header === 'match_id'){
                                    h = 'match'
                                }
                                return (
                                    <th key={`${header}-${idx}`}>
                                        { cap_words(h) }
                                    </th>
                                )
                            })
                        }
                        { sets?.length > 0 && 
                            <th>
                                Actions
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {sets.map((set, idx) => {
                        let set_row = set
                        delete set_row.set_id

                        set_row.start_datetime = set.start_datetime ? new Date(set.start_datetime).toLocaleDateString(locale, { 
                            hour: "numeric",
                            minute: "numeric"
                        }) : null
                            
                        set_row.end_datetime = set.end_datetime ? new Date(set.end_datetime).toLocaleDateString(locale, {
                            hour: "numeric",
                            minute: "numeric"
                        }) : null

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