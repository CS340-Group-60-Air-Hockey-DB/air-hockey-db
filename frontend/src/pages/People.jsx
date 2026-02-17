import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreatePersonForm from '../components/CreatePersonForm';
import UpdatePersonForm from '../components/UpdatePersonForm';
import { useLocation } from 'react-router-dom';
import cap_words from '../functions/cap_words';


function People(props) {
    const { backendURL, setLocation } = props
    const location = useLocation()

    setLocation(location)

    // Set up a state variable `people` to store and display the backend response
    const [people, setPeople] = useState([]);


    // Load table on page load
    useEffect(() => {
        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/people');
                
                // Convert the response into JSON format
                const people = await response.json();
        
                // Update the people state with the response data
                setPeople(people);
                
            } catch (error) {
                // If the API call fails, print the error to the console
                console.log(error);
            }
        };
        
        getData()
    }, [backendURL]);

    return (
        <>
            <h1>Air Hockey Players</h1>

            <table>
                <thead>
                    <tr>
                        {people?.length > 0 && Object.keys(people[0])?.map((header, index) => {
                            if(header === 'dob'){
                                return (
                                    <th key={index}>
                                        { cap_words('date_of_birth') }
                                    </th>
                                )
                            }
                            else if(header === 'phone_num'){
                                return (
                                    <th key={index}>
                                        {cap_words('phone_number')}
                                    </th>
                                )
                            }
                            else{
                                return (
                                    <th key={index}>
                                        { header === 'phone_num' ? 'Phone Number' : cap_words(header) }
                                    </th>
                                )
                            }
                        })}
                        
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {people?.map((person, index) => {
                        let person_row = person
                        delete person_row.person_id
                        return <TableRow key={index} rowObject={person_row} backendURL={backendURL} />
                    })}

                </tbody>
            </table>
            
            <CreatePersonForm backendURL={backendURL} />
            <UpdatePersonForm people={people} backendURL={backendURL} />               
        </>
    );

} export default People;