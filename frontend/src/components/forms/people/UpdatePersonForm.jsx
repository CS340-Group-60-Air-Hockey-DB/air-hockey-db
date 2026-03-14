import { useState } from 'react';
import updatePerson from '../../../fetch_funcs/people/updatePerson';

const UpdatePersonForm = (props) => {
    const { backendURL, people, refreshData, setUpdateModal } = props

    const [person, setPerson] = useState({});

    // Sets the state for all inputs
    // Splits the date of birth so the date can be automatically inputted for the date input
    const handleSelectPerson = evt => {
        let person_id = parseInt(evt.target.value)
        let person = people.find(p => p.person_id === person_id)

        if(person){
            person = person.dob ? 
                { ...person, dob: person.dob.split('T')[0]}
                : person
        }

        setPerson(person)
    }

    const handleInputOnChange = (evt) => {
        evt.preventDefault()
        const { name, value } = evt.target

        // Automatically changes the phone number to the format: xxx-xxx-xxxx when typed in
        if(name === 'phone_num'){
            switch(value.length){
                case 3:
                     setPerson({
                        ...person,
                        [name]: value + "-"
                    })
                    break;
                case 7:
                     setPerson({
                        ...person,
                        [name]: value + "-"
                    })
                    break;
                default: 
                     setPerson({
                        ...person,
                        [name]: value
                    })
                    break;
            }
        }
        else{
            setPerson({
                ...person,
                [name]: value
            })
        }
    }
    
    // Needed because the form's automatic form validation + scrolling, does not show the use the input field that is invalid due to the header being sticky
    const handleBlankInput = () => {
        // Scroll to the first required blank input
        const form = document.getElementById('update-person-form')
        const firstInvalidInput = form.querySelector(':invalid')

        if(firstInvalidInput){
            const modal = document.querySelector('.modals')
            const header = document.getElementById('modal-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const elementTop = firstInvalidInput.getBoundingClientRect().top 
                         + modal.scrollTop 
                         - modal.getBoundingClientRect().top

            modal.scrollTo({
                top: elementTop - headerHeight - 16,
                behavior: 'smooth'
            })


            // Wait for the scrolling to the required input field finishes
            // Then show the validation tooltip
            setTimeout(() => {
                firstInvalidInput.focus()
                firstInvalidInput.reportValidity();
            }, 300)
            return true
        }

        return false
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        // Calls the function + handles if the function returns true (an invalid input)
        if(handleBlankInput()){
            return
        }

        let person_res = await updatePerson(backendURL, person)

        if(person_res.status === 201){
            alert(`${person.first_name} ${person.last_name}'s information was updated.`)
            
            setPerson({})
            setUpdateModal(false)
            refreshData()
        }
        else{
            alert(`Person was not able to be updated to the database:\n${person_res.message ?? person_res.error} \n\nPlease try again or contact the administrator.`)
        }
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
                                value={person?.person_id}
                                onChange={handleSelectPerson}
                            >
                                <option value="">
                                    Select a Person
                                </option>
                                {
                                    people?.map((person) => (
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
                    Object.keys(person).length > 0 && 
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
                                    value={person.first_name ?? ''}
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
                                    value={person.last_name ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>
                        </div>

                        <div className="form-row">
                            <label htmlFor="gender">Gender
                                <select
                                    name="gender"
                                    id="gender"
                                    value={person.gender ?? ''}
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
                                    value={person.dob ?? ''}
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
                                    value={person.email ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="phone_num">
                                Phone Number (ex: 123-456-7890)
                                <input
                                    placeholder="xxx-xxx-xxxx"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                    minLength="10" 
                                    maxLength="12"
                                    type="tel"
                                    name="phone_num"
                                    id="phone_num"
                                    value={person.phone_num ?? ''}
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
                                    value={person.street_address_1 ?? ''}
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
                                    value={person.street_address_2 ?? ''}
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
                                    value={person.city ?? ''}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="state">State  
                                <input
                                    placeholder="Type State"
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={person.state ?? ''}
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
                                    value={person.country ?? 'USA'}
                                    onChange={handleInputOnChange}
                                />
                            </label>

                            <label htmlFor="zip_code">Zip Code    
                                <input
                                    placeholder="Type Zip Code"
                                    type="text"
                                    name="zip_code"
                                    id="zip_code"
                                    value={person.zip_code ?? ''}
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