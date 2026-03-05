const CreatePersonForm = ({ backendURL }) => {

    return (
        <div className="modals">
            <div id="modal-header">
                <h2>
                    Add New Person
                </h2>

                <p>
                    Fill in the details below. Any field with <span className="asterisk">*</span> are required.
                </p>
            </div>
            

            <form className='cuForm'>
                {/* Personal Info */}
                <div className="section">
                    <p className="section-label">
                        personal info
                    </p>

                    <div className="form-row">
                        <label htmlFor="first_name">First Name <span className="asterisk">*</span>
                            <input
                                placeholder="Type First Name"
                                type="text"
                                name="first_name"
                                id="first_name"
                                required
                                autoFocus
                            />
                        </label>

                        <label htmlFor="last_name">Last Name <span className="asterisk">*</span> 
                            <input
                                placeholder="Type Last Name"
                                type="text"
                                name="last_name"
                                id="last_name"
                                required
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label htmlFor="gender">Gender
                            <select
                                name="gender"
                                id="gender"
                            >
                                <option value="prefer not to say">Prefer not to say</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        <label htmlFor="dob">Date of Birth <span className="asterisk">*</span>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Contact */}
                <div className="section">
                    <p className="section-label">
                        contact
                    </p>

                    <div className="form-row">
                        <label htmlFor="email">Email
                            <input
                                placeholder="Type Email"
                                type="email"
                                name="email"
                                id="email"
                            />
                        </label>

                        <label htmlFor="phone_num">Phone
                            <input
                                placeholder="(xxx) xxx - xxxx"
                                type="tel"
                                name="phone_num"
                                id="phone_num"
                            />
                        </label>
                    </div>
                </div>

                {/* Address */}
                <div className="section">
                    <p className="section-label">
                        address
                    </p>

                    <div className="form-row">
                        <label 
                            className="address-line"
                            htmlFor="street_address_1"
                        >
                            Address
                            
                            <input
                                placeholder="Type Street Address (Line 1)"
                                type="text"
                                name="street_address_1"
                                id="street_address_1"
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label 
                            className="address-line"
                            htmlFor="street_address_2"
                        >
                                
                            Address Line 2
                            
                            <input
                                placeholder="Type Street Address (Line 2)"
                                type="text"
                                name="street_address_2"
                                id="street_address_2"
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label htmlFor="city">City
                            <input
                                placeholder="Type City"
                                type="text"
                                name="city"
                                id="city"
                            />
                        </label>

                        <label htmlFor="state">State  
                            <input
                                placeholder="Type State"
                                type="text"
                                name="state"
                                id="state"
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label htmlFor="country">Country <span className="asterisk">*</span>  
                            <input
                                placeholder="Type Country"
                                type="text"
                                name="country"
                                id="country"
                                defaultValue="USA"
                                required
                            />
                        </label>

                        <label htmlFor="zip_code">Zip Code    
                            <input
                                placeholder="Type Zip Code"
                                type="text"
                                name="zip_code"
                                id="zip_code"
                            />
                        </label>
                    </div>
                </div>
            
                <div id="modal-btn-row">
                    <button type="submit" value="Add Person">
                        Add Person
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePersonForm;