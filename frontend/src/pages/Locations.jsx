import AddLocation from '../components/forms/locations/AddLocation';
import UpdateLocation from '../components/forms/locations/UpdateLocation';
import cap_words from '../functions/cap_words';
import TableRow from '../components/TableRow';


// This will include the person's first + last name of who owns the location (as the owner)
function Locations(props) {
    const { backendURL, locations, people,  } = props
    
    // Takes out location_id from the array
    let locationsArr = locations?.map(({location_id, ...rest}) => rest)


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
                        {locationsArr?.length > 0 && Object.keys(locationsArr[0])?.map((header, index) => {
                            if(header === 'table_qty'){
                                return (
                                    <th key={index}>
                                        { cap_words('table_quantity') }
                                    </th>
                                )
                            }
                            else if(header === 'phone_num'){
                                return (
                                    <th key={index}>
                                        { cap_words('phone_number') }
                                    </th>
                                )
                            }
                            else{
                                return (
                                    <th key={index}>
                                        { cap_words(header) }
                                    </th>
                                )
                            }
                        })}
                    </tr>
                </thead>

                <tbody>
                    {locationsArr?.map((location, index) => {
                        let location_row = location
                        
                        return <TableRow key={index} rowObject={location_row} backendURL={backendURL} />
                    })}
                </tbody>
            </table>
            
            <hr />

            <AddLocation />
            
            <hr />

            <UpdateLocation locations={locationsArr} people={people} />

        </div>
    )
}

export default Locations;