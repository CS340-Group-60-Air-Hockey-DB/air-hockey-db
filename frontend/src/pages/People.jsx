import { useMemo } from 'react';
import TableRow from '../components/TableRow';
import CreatePersonForm from '../components/forms/people/CreatePersonForm';
import UpdatePersonForm from '../components/forms/people/UpdatePersonForm';
import cap_words from '../functions/cap_words';


const header_map = {
    dob: 'date_of_birth',
    phone_num: 'phone_number'
}


function People(props) {
    const { backendURL, locale, people } = props
    
        // Memoize headers + rows
        // Will only recalculate if the people table in the backend changes
        // Makes getting the table headers more efficient
        const headers = useMemo(() => {
            if(!people?.length) return []
    
            return Object.keys(people[0]).filter(header => header !== 'person_id')
        }, [people])
    
        const rows = useMemo(() => {
            if(!people?.length) return []
    
            return people?.map(person => {
                // person_id will not show up in table
                const { person_id, ...rest } = person
                
                return {
                ...rest,
                dob: rest.dob
                    ? new Date(rest.dob).toLocaleDateString(locale)
                    : null
                };
            });
        }, [people, locale])
    

    return (
        <div id='page-styles'>
            <div>
                <h1>Community</h1>

                <p>
                    Browse and manage players, officials, and location owners in the air hockey community. Add, edit, or remove people from the database.
                </p>
            </div>

            <table>
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
                    { rows.map((person, index) => (
                        <TableRow
                            key={`person-${index}`} 
                            rowObject={person} 
                            backendURL={backendURL} 
                        />
                    ))}

                </tbody>
            </table>
            
            <CreatePersonForm backendURL={backendURL} />
            <UpdatePersonForm people={people} backendURL={backendURL} />               
        </div>
    );

} export default People;