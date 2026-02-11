const CreatePersonForm = ({ backendURL, refreshPeople }) => {

    return (
        <>
        <h2>Add a New Person</h2>

        <form className='cuForm'>
            <label htmlFor="first_name">First Name: </label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                required
            />

            <label htmlFor="last_name">Last Name: </label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                required
            />

            <label htmlFor="gender">Gender: </label>
            <select
                name="gender"
                id="gender"
            >
                <option value="prefer not to say">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="dob">Date of Birth: </label>
            <input
                type="date"
                name="dob"
                id="dob"
            />

            <label htemlFor="email">Email: </label>
            <input
                type="email"
                name="email"
                id="email"
            />

            <label htmlFor="phone_num">Phone: </label>
            <input
                type="tel"
                name="phone_num"
                id="phone_num"
            />

            <label htmlFor="street_address_1">Address: </label>
            <input
                type="text"
                name="street_address_1"
                id="street_address_1"
            />

            <label htmlFor="street_address_2">Address 2: </label>
            <input
                type="text"
                name="street_address_2"
                id="street_address_2"
            />

            <label htmlFor="city">City: </label>
            <input
                type="text"
                name="city"
                id="city"
            />
        
            <label htmlFor="state">State: </label>  
            <input
                type="text"
                name="state"
                id="state"
            />

            <label htmlFor="country">Country: </label>  
            <input
                type="text"
                name="country"
                id="country"
                defaultValue="USA"
            />

            <label htmlFor="zip_code">Zip Code: </label>    
            <input
                type="text"
                name="zip_code"
                id="zip_code"
            />
        
            <input type="submit" value="Add Person" />
        </form>
        </>
    );
};

export default CreatePersonForm;