import { useMemo } from 'react';
import AddLocation from '../components/forms/locations/AddLocation';
import UpdateLocation from '../components/forms/locations/UpdateLocation';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


const header_map = {
    table_qty: 'table_quantity',
    phone_num: 'phone_number'
}


// This will include the person's first + last name of who owns the location (as the owner)
function Locations(props) {
    const { backendURL, locations, people,  } = props
        
    // Memoize headers + rows
    // Will only recalculate if the locations table in the backend changes
    // Makes getting the table headers more efficient
    const headers = useMemo(() => {
        if(!locations?.length) return []
        
        return Object.keys(locations[0]).filter(header => header !== 'location_id')
    }, [locations])
        
    const rows = useMemo(() => {
        if(!locations?.length) return []
        
        return locations?.map(location => {
            // location_id will not show up in table
            const { location_id, ...rest } = location
                    
            return { ...rest }
        });
    }, [locations])


    return (
        <div className="page-container">
            <div>
                <h1>Locations</h1>
                
                <p>
                    Browse locations where Air Hockey tables can be found and includes locations for venues of tournaments. Track table quantities, associated owner or business, venue details, and tournament locations. Add, edit, or remove locations.
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
                    </tr>
                </thead>

                <tbody>
                    {
                        rows.map((location, index) => {
                            return <TableRow key={index} rowObject={location} backendURL={backendURL} />
                        })
                     }
                </tbody>
            </table>
            
            <hr />

            <AddLocation />
            
            <hr />

            <UpdateLocation locations={locations} people={people} />

        </div>
    )
}

export default Locations;