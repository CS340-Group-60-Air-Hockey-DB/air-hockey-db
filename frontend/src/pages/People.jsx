import { useMemo, useState } from 'react';
import TableRow from '../components/TableRow';
import CreatePersonForm from '../components/forms/people/CreatePersonForm';
import UpdatePersonForm from '../components/forms/people/UpdatePersonForm';
import cap_words from '../functions/cap_words';


const header_map = {
    dob: 'date_of_birth',
    phone_num: 'phone_number'
}


function People(props) {
    const { backendURL, locale, people, refreshData } = props

    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    
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
    
        // On key down "esc", close modal
        window.addEventListener('keydown', (evt) => {
            if(evt.key === 'Escape'){
                setAddModal(false)
            }
        })


    return (
        <div id='page-styles'>
            <div>
                <h1>Community</h1>

                <p>
                    Browse and manage players, officials, and location owners in the air hockey community. Add, edit, or remove people from the database.
                </p>
            </div>

            <div id='table-div'>
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
            </div>
            
            <div id='btn-row'>
                <button
                    id='add-person'
                    className='default-btn'
                    onClick={() => setAddModal(true)}
                >
                    Add Person
                </button>

                <button
                    id='update-person'
                    className='default-btn'
                    onClick={() => setUpdateModal(true)}
                >
                    Update Person
                </button>
            </div>

            {
                addModal && 
                    <CreatePersonForm 
                        backendURL={backendURL}
                        refreshData={refreshData}
                        setAddModal={setAddModal}
                    />

            }     

            {
                updateModal && 
                <UpdatePersonForm 
                    backendURL={backendURL}
                    people={people}
                    refreshData={refreshData}
                    setUpdateModal={setUpdateModal}
                />
            }     
        </div>
    );

} export default People;