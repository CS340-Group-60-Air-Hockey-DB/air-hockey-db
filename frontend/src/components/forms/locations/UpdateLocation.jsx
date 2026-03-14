import { useState, useEffect } from "react";

function UpdateLocation({ backendURL, locations, peopleList, refreshData }) {   
    const [selectedLocationId, setSelectedLocationId] = useState('');

    const [formData, setFormData] = useState({
        location_name: '',
        table_qty: '',
        email: '',
        phone_num: '',
        street_address_1: '',
        street_address_2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        type_of_address: '',
        note: '',
        person_id: ''
    });

    // autofill form if new location is selected from dropdown
    useEffect(() => {
        if (selectedLocationId) {
            const loc = locations.find(l => String(l.location_id) === String(selectedLocationId));

            if (loc) {
                setFormData({
                    location_name: loc.location_name || '',
                    table_qty: loc.table_qty || 0,
                    email: loc.email || '',
                    phone_num: loc.phone_num || '',
                    street_address_1: loc.street_address_1 || '',
                    street_address_2: loc.street_address_2 || '',
                    city: loc.city || '',
                    state: loc.state || '',
                    country: loc.country || '',
                    zip_code: loc.zip_code || '',
                    type_of_address: loc.type_of_address || '',
                    note: loc.note || '',
                    person_id: loc.person_id || ''
                });
            }
        } else {
            setFormData({
                location_name: '', table_qty: '', email: '', phone_num: '',
                street_address_1: '', street_address_2: '', city: '', state: '',
                country: '', zip_code: '', type_of_address: '', note: '', person_id: ''
            });
        }
    }, [selectedLocationId, locations]);

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // submit PUT request
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedLocationId) {
            alert("Please select a location to update first.");
            return;
        }

        try {
            const response = await fetch(`${backendURL}/locations/${selectedLocationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Location successfully updated!");
                // clear form
                setSelectedLocationId('');
                // update table
                if (refreshData) refreshData();
            } else {
                const err = await response.json();
                alert(`Error: ${err.error || "Failed to update location"}`);
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            alert("Network error.");
        }
    };

    return (
        <form id="update-form" onSubmit={handleSubmit} >
            <h2>Update Existing Location</h2>

            <label>Select Location: </label>
            <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                required
            >
                <option value="">Select a Location</option>
                {locations.map(loc => (
                    <option key={loc.location_id} value={loc.location_id}>
                        {loc.location_name}
                    </option>
                ))}
            </select>

            <hr />

            <input type="text" name="location_name" value={formData.location_name} onChange={handleChange} placeholder="Location Name" required />
            <input type="number" name="table_qty" value={formData.table_qty} onChange={handleChange} placeholder="Table Quantity" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone_num" value={formData.phone_num} onChange={handleChange} placeholder="Phone Number" />
            <input type="text" name="street_address_1" value={formData.street_address_1} onChange={handleChange} placeholder="Street Address 1" required/>
            <input type="text" name="street_address_2" value={formData.street_address_2} onChange={handleChange} placeholder="Street Address 2" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
            <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="Zip Code" required />

            <select name="type_of_address" value={formData.type_of_address} onChange={handleChange} required>
                <option value="">Select Type of Address</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="club">Club</option>
                <option value="bar">Bar</option>
                <option value="other">Other</option>
            </select>
            
            <select name="person_id" value={formData.person_id} onChange={handleChange}>
                <option value="">Select an Owner</option>
                {peopleList && peopleList.map(person => (
                    <option key={person.person_id} value={person.person_id}>
                        {person.first_name} {person.last_name}
                    </option>
                ))}
            </select>

            <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Notes (Optional)" maxLength="10000" />

            <button type="submit">Update Location</button>
        </form>
    );
}

export default UpdateLocation;