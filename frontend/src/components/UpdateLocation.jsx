import { useState } from "react";

function UpdateLocation({ locations = [], people }) {   
    const [selectedPerson, setSelectedPerson] = useState('');
    const personToUpdate = people.find(p => p.person_id === parseInt(selectedPerson));

    return (
        <div>
            <h2>Update Existing Location</h2>

            <label>Select Location: </label>
            <select name="location_id" required>
                <option value="">Select a Location</option>
                {locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                        {location.location_name}
                    </option>
                ))}
            </select>

            <br /><br />

            <input type="text" placeholder="Update Location Name" required />

            <select
                name="update_person_id"
                id="update_person_id"
                value={selectedPerson}
                onChange={(e) => setSelectedPerson(e.target.value)}
            >
                <option value="">Select a New Owner</option>
                {people.map((person) => (
                    <option key={person.person_id} value={person.person_id}>
                        {person.first_name} {person.last_name}
                    </option>
                ))}
            </select>

            <input type="number" placeholder="Update Table Quantity" required />
            <input type="email" placeholder="Update Email" />
            <input type="text" placeholder="Update Phone Number" />
            <input type="text" placeholder="Update Street Address 1" required/>
            <input type="text" placeholder="Update Street Address 2" />
            <input type="text" placeholder="Update City" required />
            <input type="text" placeholder="Update State" required />
            <input type="text" placeholder="Update Zip Code" required />
            <select required>
                <option value="">Select Updated Type of Address</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="club">Club</option>
                <option value="bar">Bar</option>
                <option value="other">Other</option>
            </select>

            <br /><br />

            <button type="submit">Update Location</button>
        </div>
    );
}

export default UpdateLocation;