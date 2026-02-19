import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreatePersonForm from '../components/CreatePersonForm';
import UpdatePersonForm from '../components/UpdatePersonForm';
import { useLocation } from 'react-router-dom';
import cap_words from '../functions/cap_words';


function People(props) {
    const { backendURL, locale, people, setUserLocation } = props
    const userLocation = useLocation()

    setUserLocation(userLocation)


    return (
        <div>
            <div>
                <h1>Community</h1>

                <p>
                    Browse and manage players, officials, and location owners in the air hockey community. Add, edit, or remove people from the database.
                </p>
            </div>

            <table>
                <thead>
                    <tr>
                        {people?.length > 0 && Object.keys(people[0])?.map((header, index) => {
                            if(header === 'dob'){
                                return (
                                    <th key={`header-${index}`}>
                                        { cap_words('date_of_birth') }
                                    </th>
                                )
                            }
                            else if(header === 'phone_num'){
                                return (
                                    <th key={`header-${index}`}>
                                        {cap_words('phone_number')}
                                    </th>
                                )
                            }
                            else{
                                return (
                                    <th key={`header-${index}`}>
                                        { cap_words(header) }
                                    </th>
                                )
                            }
                        })}
                    </tr>
                </thead>

                <tbody>
                    {people?.map((person, index) => {
                        let person_row = person
                        delete person_row.person_id
                        let dob = new Date(person.dob)
                        person_row.dob = dob.toLocaleDateString(locale)

                        return <TableRow key={`person-${index}`} rowObject={person_row} backendURL={backendURL} />
                    })}

                </tbody>
            </table>
            
            <CreatePersonForm backendURL={backendURL} />
            <UpdatePersonForm people={people} backendURL={backendURL} />               
        </div>
    );

} export default People;