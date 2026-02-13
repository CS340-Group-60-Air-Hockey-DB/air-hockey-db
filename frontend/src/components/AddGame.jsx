import React from 'react';

function AddGame({ sets }) {
    return (
        <form>
            <h2>Add a New Game</h2>

            <label>Select Set:</label>
            <select required>
                {sets.map(s => <option key={s.id} value={s.id}>{s.description}</option>)}
            </select>

            <label>Game Number:</label>
            <input type="number" min="1" max="7" required />

            <br /><br />

            <label>Player 1 Score:</label>
            <input type="number" min="0" max="7"required />

            <label>Player 2 Score:</label>
            <input type="number" min="0" max="7"required />

            <label> Status: </label>
            <select required>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button type="submit">Add Game</button>
        </form>  
    );
}

export default AddGame;

