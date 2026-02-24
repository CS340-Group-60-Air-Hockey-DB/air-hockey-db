function AddLocation() {
    return (
        <form id="add-form">
            <h2>Add a New Location</h2>
            <input type="text" placeholder="Location Name" required />
            <input type="number" placeholder="Table Quantity" required />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Street Address 1" required/>
            <input type="text" placeholder="Street Address 2" />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="Zip Code" required />
            <select required>
                <option value="">Select Type of Address</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="club">Club</option>
                <option value="bar">Bar</option>
                <option value="other">Other</option>
            </select>
            
            <button type="submit">Add Location</button>

        </form>     
    );
}

export default AddLocation;