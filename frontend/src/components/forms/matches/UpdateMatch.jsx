import { useState } from 'react';
import getInputDatetime from '../../../functions/input_datetime';
import { faceoff_type_arr, match_status_arr, match_type_arr, set_max_arr } from '../../../ common_variables';


function UpdateMatch({ backendURL, locations, matches, refreshData}) {
    const [selectedMatchId, setSelectedMatchId] = useState('');
    const [faceoffType, setFaceoffType] = useState('standard');
    const [locationId, setLocationId] = useState('');
    const [matchStatus, setMatchStatus] = useState('scheduled');
    const [matchType, setMatchType] = useState('challenge');
    const [note, setNote] = useState('')
    const [endDatetime, setEndDatetime] = useState('');
    const [setMax, setSetMax] = useState(3)
    const [startDatetime, setStartDatetime] = useState('');

    const clearForm = () => {
        setEndDatetime('');
        setFaceoffType('standard')
        setLocationId('');
        setMatchStatus('scheduled');
        setMatchType('challenge')
        setNote('')
        setStartDatetime('');
        setSelectedMatchId('')
        setSetMax(3)
    }

    // auto-fill form when match is selected
    const handleMatchSelect = (e) => {
        clearForm()

        const matchId = e.target.value;
        setSelectedMatchId(matchId);

        if (matchId) {
            const match = matches.find(m => m.match_id === parseInt(matchId));
            
            if (match) {
                // get existing data for match
                const foundLocation = locations.find(loc => loc.location_name === match.location_name);
                setLocationId(foundLocation ? foundLocation.location_id: '');

                setMatchStatus(match.match_status || 'scheduled');
                setMatchType(match.match_type || matchType);
                setFaceoffType(match.faceoff_type || faceoffType);
                setSetMax(match.set_max || setMax);
                setNote(match.note || '')
                
                if (match.end_datetime) {
                    const formattedDate = getInputDatetime(match.end_datetime)
                    setEndDatetime(formattedDate);
                } else {
                    setEndDatetime('');
                }
                if (match.start_datetime) {
                    const formattedDate = getInputDatetime(match.start_datetime)
                    setStartDatetime(formattedDate);
                } else {
                    setStartDatetime('');
                }
            }
        } else {
            clearForm()
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData = {
            match_id: selectedMatchId,
            location_id: locationId || null,
            match_status: matchStatus,
            end_datetime: endDatetime || null,
            set_max: setMax,
            start_datetime: startDatetime || null,
            faceoff_type: faceoffType,
            match_type: matchType,
            note: note
        };

        try {
            const response = await fetch(`${backendURL}/matches/${selectedMatchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                alert("Match updated successfully!");
                refreshData()
            } else {
                alert("Failed to update match. Please try again.");
            }
        } catch (error) {
            console.error("Error during match update:", error);
            alert("An error occurred while connecting to the server.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update an Existing Match</h2>

            <div
                id='update-form'
                className='update-matches'
            >
                <label
                    htmlFor='select-match'
                >
                    Select Match:
                    <select
                        name='select-match' 
                        required 
                        value={selectedMatchId} 
                        onChange={handleMatchSelect}
                    >
                        <option value="">Select a Match</option>
                        {matches.sort((a, b) => a.match_id - b.match_id).map(m => <option key={m.match_id} value={m.match_id}>{m.match_id}</option>)}
                    </select>
                    </label>

                {
                    selectedMatchId && 
                    <>
                        <label
                            htmlFor='location'
                        > 
                            Location: 
                            <select
                                name='location' 
                                value={locationId} 
                                onChange={(e) => setLocationId(e.target.value)}>
                                <option value="">Select a Location</option>
                                {locations.map(loc => <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>)}
                            </select>
                        </label>

                            <label
                                htmlFor='set_max'
                            > 
                                Number of Sets: 
                                <select
                                    name='set_max' 
                                    value={setMax} 
                                    onChange={(e) => setSetMax(e.target.value)}>
                                    {
                                        set_max_arr.map((num, idx) => 
                                            <option
                                                value={num}
                                                id={idx}
                                                key={idx}
                                            >
                                                {num}
                                            </option>
                                        )
                                    }
                                </select>
                            </label>

                            <label
                                htmlFor='start_datetime'
                            > 
                                Start Time: 
                                <input 
                                    type="datetime-local" 
                                    id="start_datetime"
                                    name="start_datetime"
                                    value={startDatetime}
                                    onChange={(e) => setStartDatetime(e.target.value)} 
                                />
                            </label>

                            <br/><br/>

                            <label
                                htmlFor='end_datetime'
                            > 
                                End Time: 
                                <input 
                                    type="datetime-local" 
                                    id="end_datetime"
                                    name="end_datetime"
                                    value={endDatetime}
                                    onChange={(e) => setEndDatetime(e.target.value)} 
                                />
                            </label>

                            <label
                                htmlFor='faceoff-type'
                            > 
                                Faceoff Type: 
                                <select
                                    name='faceoff-type' 
                                    value={faceoffType} 
                                    onChange={(e) => setFaceoffType(e.target.value)}>
                                    {
                                        faceoff_type_arr.map((faceoff, idx) => 
                                            <option
                                                value={faceoff}
                                                id={idx}
                                                key={idx}
                                            >
                                                {faceoff}
                                            </option>
                                        )
                                    }
                                </select>
                            </label>

                            <label
                                htmlFor='match-type'
                            >
                                Match Type: 
                                <select
                                    name='match-type' 
                                    value={matchType} 
                                    onChange={(e) => setMatchType(e.target.value)}
                                >
                                    {
                                        match_type_arr.map((type, idx) => 
                                            <option
                                                value={type}
                                                id={idx}
                                                key={idx}
                                            >
                                                {type}
                                            </option>
                                        )
                                    }
                                </select>
                            </label>

                            <label
                                htmlFor='match-status'
                            > 
                                Match Status: 
                                <select
                                    name='match-status'
                                    value={matchStatus} 
                                    onChange={(e) => setMatchStatus(e.target.value)}
                                >
                                    {
                                        match_status_arr.map((faceoff, idx) => 
                                            <option
                                                value={faceoff}
                                                id={idx}
                                                key={idx}
                                            >
                                                {faceoff}
                                            </option>
                                        )
                                    }
                                </select>
                            </label>

                            <label
                                className='note-textbox'
                                htmlFor='note'
                            > 
                                Note: 
                                <textarea
                                    type='text'
                                    id='note'
                                    name='note'
                                    value={note ?? ''}
                                    onChange={evt => setNote(evt.target.value)}
                                    rows={5}
                                    cols={30}
                                    maxLength={10000}
                                />
                            </label>

                        <div id='form-btn-div'>
                            <button type="submit">
                                Update Match
                            </button>
                        </div>
                    </>
                }
            </div>
            
        </form>
    );
}

export default UpdateMatch;