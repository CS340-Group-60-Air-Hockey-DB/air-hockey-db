import { useState } from 'react';

const UpdatePersonForm = (props) => {
    const { backendURL, people, refreshData, setUpdateModal } = props

    const [selectedPerson, setSelectedPerson] = useState('');
    const updatePerson = people.find(p => p.person_id === parseInt(selectedPerson));

    const handleInputOnChange = () => {

    }
    
    const handleSubmit = () => {

    }


    return (
        <div 
            id="backdrop"
            // The onClick allows for the form modal to be exited if the user clicks outside of the modal
            onClick={evt => {
                if(evt.target === evt.currentTarget){
                    setUpdateModal(false)
                }
            }}
        >
            <div className="modals">
                <div id='modal-header'>
                    <button 
                        id="modal-cancel"
                        onClick={() => setUpdateModal(false)}
                    >
                        X
                    </button>

                    <h2>
                        Update a Person
                    </h2>

                    <div id='modal-p-div'>
                        <p>
                            Pick a person to update. Then scroll and fill in any details you&apos;d like to change. 
                        </p>
                        <p>
                            Any fields with <span className="asterisk">*</span> are required.
                        </p>
                    </div>
                </div>
            
            <form id="update-person-form"
                    className='cuForm'
                    onSubmit={handleSubmit}
                    // Disable the forms auto validation for scrolling in the handleSubmit function above
                    noValidate
                >
                    <div className="section">
                        <div className="form-row update-person-select">
                            <label 
                                htmlFor="update_person_id"
                                className='section-label'
                            >
                                Person to Update <span className="asterisk">*</span>
                            </label>

                            <select
                                name="update_person_id"
                                id="update_person_id"
                                required
                                value={selectedPerson}
                                onChange={(e) => setSelectedPerson(e.target.value)}
                            >
                                <option value="">
                                    Select a Person
                                </option>
                                {
                                    people.map((person) => (
                                        <option 
                                            key={person.person_id} 
                                            value={person.person_id}
                                        >
                                            {person.first_name} {person.last_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    
                {
                    selectedPerson && 
                    <>
                        {/* Personal Info */}
                        <div className="section">
                            <p className="section-label">
                                personal info
                            </p>

                            <div className="form-row">
                            <label htmlFor="update_first_name">
                                First Name <span className="asterisk">*</span>
                                
                                <input
                                    placeholder="Type First Name"
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    required
                                    autoFocus
                                    value={updatePerson.first_name ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="last_name">
                                Last Name <span className="asterisk">*</span> 
                                
                                <input
                                    placeholder="Type Last Name"
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    required
                                    value={updatePerson.last_name ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>
                        </div>

                        <div className="form-row">
                            <label htmlFor="gender">Gender
                                <select
                                    name="gender"
                                    id="gender"
                                    value={updatePerson.gender ?? ''}
                                    onChange={handleInputOnChange}
                                >
                                    <option value=''> Select a Gender </option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                    <option value="prefer not to say">Prefer not to say</option>
                                </select>
                            </label>

                            <label htmlFor="dob">Date of Birth <span className="asterisk">*</span>
                                <input
                                    type="date"
                                    name="dob"
                                    id="dob"
                                    required
                                    value={updatePerson.dob ?? ''}
                                    onChange={handleInputOnChange}
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
                                    value={updatePerson.email ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="phone_num">Phone Number (ex: 123-456-7890)
                                <input
                                    placeholder="xxx-xxx-xxxx"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                    minLength="10" 
                                    maxLength="12"
                                    type="tel"
                                    name="phone_num"
                                    id="phone_num"
                                    value={updatePerson.phone_num ?? ''}
                                    onChange={handleInputOnChange}
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
                                    value={updatePerson.street_address_1 ?? ''}
                                    onChange={handleInputOnChange}
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
                                    value={updatePerson.street_address_2 ?? ''}
                                    onChange={handleInputOnChange}
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
                                    value={updatePerson.city ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="state">State  
                                <input
                                    placeholder="Type State"
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={updatePerson.state ?? ''}
                                    onChange={handleInputOnChange}
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
                                    required
                                    value={updatePerson.country ?? 'USA'}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="zip_code">Zip Code    
                                <input
                                    placeholder="Type Zip Code"
                                    type="text"
                                    name="zip_code"
                                    id="zip_code"
                                    value={updatePerson.zip_code ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>
                        </div>
                    </div>
                
                    <div id="modal-btn-row">
                        <button 
                            type="submit"
                        >
                            Update Person
                        </button>
                    </div>
                    </>
                }
            </form>
            </div>
        </div>        
    );
};

export default UpdatePersonForm;

// <label htmlFor="update_last_name">Last Name: </label>
                        // <input
                        //     type="text"
                        //     name="last_name"
                        //     id="update_last_name"
                        //     required
                        //     value={updatePerson?.last_name || ''}
                        // />

                        // <label htmlFor="update_gender">Gender: </label>
                        // <select
                        //     name="gender"
                        //     id="update_gender"
                        // >
                        //     <option value="prefer not to say">Prefer not to say</option>
                        //     <option value="female">Female</option>
                        //     <option value="male">Male</option>
                        //     <option value="other">Other</option>
                        // </select>

                        // <label htmlFor="update_dob">Date of Birth: </label>
                        // <input
                        //     type="date"
                        //     name="dob"
                        //     id="update_dob"
                        //     value={updatePerson?.dob || ''}

                        // />

                        // {/* Contact Info */}
                        // <div className="section">
                        //     <p className="section-label">
                        //         personal info
                        //     </p>

                        //     <div className="form-row">

                        //     </div>
                        // </div>

                        // <label htmlFor ="update_email">Email: </label>
                        // <input
                        //     type="email"
                        //     name="email"
                        //     id="update_email"
                        //     value={updatePerson?.email || ''}
                        // />

                        // <label htmlFor="update_phone_num">Phone: </label>
                        // <input
                        //     type="tel"
                        //     name="phone_num"
                        //     id="update_phone_num"
                        //     value={updatePerson?.phone_num || ''}
                        // />

                        // {/* Address */}
                        // <div className="section">
                        //     <p className="section-label">
                        //         personal info
                        //     </p>

                        //     <div className="form-row">

                        //     </div>
                        // </div>
                        // <label htmlFor="update_street_address_1">Address: </label>
                        // <input
                        //     type="text"
                        //     name="street_address_1"
                        //     id="update_street_address_1"
                        //     value={updatePerson?.street_address_1 || ''}
                        // />

                        // <label htmlFor="update_street_address_2">Address Line 2: </label>
                        // <input
                        //     type="text"
                        //     name="street_address_2"
                        //     id="update_street_address_2"
                        //     value={updatePerson?.street_address_2 || ''}
                        // />

                        // <label htmlFor="update_city">City: </label>
                        // <input
                        //     type="text"
                        //     name="city"
                        //     id="update_city"
                        //     value={updatePerson?.city || ''}
                        // />

                        // <label htmlFor="update_state">State: </label>
                        // <input
                        //     type="text"
                        //     name="state"
                        //     id="update_state"
                        //     value={updatePerson?.state || ''}
                        // />

                        // <label htmlFor="update_country">Country: </label>
                        // <input
                        //     type="text"
                        //     name="country"
                        //     id="update_country"
                        //     value={updatePerson?.country || ''}
                        // />

                        // <label htmlFor="update_zip_code">Zip Code: </label>
                        // <input
                        //     type="text"
                        //     name="zip_code"
                        //     id="update_zip_code"
                        //     value={updatePerson?.zip_code || ''}
                        // />

                        // <input type="submit" value="Update Person"/>