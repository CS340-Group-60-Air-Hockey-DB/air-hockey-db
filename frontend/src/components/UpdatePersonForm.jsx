import { useState } from 'react';

const UpdatePersonForm = ({ people, backendURL, refreshPeople }) => {

    const [selectedPerson, setSelectedPerson] = useState('');
    const personToUpdate = people.find(p => p.person_id === parseInt(selectedPerson));

    return (
        <>
        <h2>Update a Person</h2>
        <form className='cuForm'>
            <label htmlFor="update_person_id">Person to Update: </label>
            <select
                name="update_person_id"
                id="update_person_id"
                value={selectedPerson}
                onChange={(e) => setSelectedPerson(e.target.value)}
            >
                <option value="">Select a Person</option>
                {people.map((person) => (
                    <option key={person.person_id} value={person.person_id}>
                        {person.person_id} - {person.first_name} {person.last_name}
                    </option>
                ))}
            </select>
            
            <label htmlFor="update_first_name">First Name: </label>
            <input
                type="text"
                name="first_name"
                id="update_first_name"
                defaultValue={personToUpdate?.first_name || ''}
            />

            <label htmlFor="update_last_name">Last Name: </label>
            <input
                type="text"
                name="last_name"
                id="update_last_name"
                defaultValue={personToUpdate?.last_name || ''}
            />

            <label htmlFor="update_gender">Gender: </label>
            <select
                name="gender"
                id="update_gender"
            >
                <option value="prefer not to say">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="update_dob">Date of Birth: </label>
            <input
                type="date"
                name="dob"
                id="update_dob"
                defaultValue={personToUpdate?.dob || ''}

            />

            <label htmlFor ="update_email">Email: </label>
            <input
                type="email"
                name="email"
                id="update_email"
                defaultValue={personToUpdate?.email || ''}
            />

            <label htmlFor="update_phone_num">Phone: </label>
            <input
                type="tel"
                name="phone_num"
                id="update_phone_num"
                defaultValue={personToUpdate?.phone_num || ''}
            />

            <label htmlFor="update_street_address_1">Address: </label>
            <input
                type="text"
                name="street_address_1"
                id="update_street_address_1"
                defaultValue={personToUpdate?.street_address_1 || ''}
            />

            <label htmlFor="update_street_address_2">Address Line 2: </label>
            <input
                type="text"
                name="street_address_2"
                id="update_street_address_2"
                defaultValue={personToUpdate?.street_address_2 || ''}
            />

            <label htmlFor="update_city">City: </label>
            <input
                type="text"
                name="city"
                id="update_city"
                defaultValue={personToUpdate?.city || ''}
            />

            <label htmlFor="update_state">State: </label>
            <input
                type="text"
                name="state"
                id="update_state"
                defaultValue={personToUpdate?.state || ''}
            />

            <label htmlFor="update_country">Country: </label>
            <input
                type="text"
                name="country"
                id="update_country"
                defaultValue={personToUpdate?.country || ''}
            />

            <label htmlFor="update_zip_code">Zip Code: </label>
            <input
                type="text"
                name="zip_code"
                id="update_zip_code"
                defaultValue={personToUpdate?.zip_code || ''}
            />

            <input type="submit" value="Update Person"/>
        </form>
        </>
    );
};

export default UpdatePersonForm;