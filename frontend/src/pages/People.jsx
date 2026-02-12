import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreatePersonForm from '../components/CreatePersonForm';
import UpdatePersonForm from '../components/UpdatePersonForm';


function People({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [people, setPeople] = useState([
        {
            person_id: 1,
            first_name: 'Jane',
            last_name: 'Doe',
            gender: 'female',
            dob: '1999-12-12',
            email: 'jdoe@oregonstate.edu',
            phone_num: '123-456-7890'
        },
        {
            person_id: 2,
            first_name: 'John',
            last_name: 'Smith',
            gender: 'male',
            dob: '1998-03-15',
            email: 'jsmith@oregonstate.edu',
            phone_num: '098-765-4321'
        }
    ]);

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

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Air Hockey Players</h1>

            <table>
                <thead>
                    <tr>
                        {people.length > 0 && Object.keys(people[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {people.map((person, index) => (
                        <TableRow key={index} rowObject={person} backendURL={backendURL} refreshPeople={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreatePersonForm backendURL={backendURL} refreshPeople={getData} />
            <UpdatePersonForm people={people} backendURL={backendURL} refreshPeople={getData} />               
        </>
    );

} export default People;