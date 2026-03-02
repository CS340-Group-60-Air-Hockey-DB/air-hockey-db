// Database
const db = require('../database/db-connector');
const match_queries = require('../database/queries/matches.js');
const create_matches_with_fks = require('../database/views/matches_with_fks.js');


const get_all_matches = async (req, res) => {
    try {
        // Create matches_with_fks View
        await db.query(create_matches_with_fks)

        const [matches] = await db.query(match_queries.select_all_view);

        res.status(200).json(matches);

    } catch (error) {
        res.status(500).send("An error occurred while getting all the matches with foreign key data.");
    }
}

const get_all_match_locations = async (req, res) => {
    try {
        const [locations] = await db.query(match_queries.select_all_match_locations);

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send("An error occurred while getting locations in matches.");
    }
}

const get_all_match_people = async (req, res) => {
    try {
        const [people] = await db.query(match_queries.select_all_match_people);

        res.status(200).json(people);

    } catch (error) {
        res.status(500).send("An error occurred while getting people in matches.");
    }
}

const delete_match = async (req, res) => {
    try {
        const matchID = req.params.id;

        const query = `
            SET @rows_affected = 0;
            SET @error_message = '';
            CALL sp_delete_match(?, @rows_affected, @error_message);
            SELECT @rows_affected AS rowsAffected, @error_message AS errorMessage;
        `;

        const [results] = await db.query(query, [matchID]);

        // get results from the SELECT statement
        const outcome = results[3][0];

        if (outcome.rowsAffected === -99) {
            return res.status(400).json({ error: outcome.errorMessage });
        }

        res.status(200).json({ message: "Match deleted successfully!" });

    } catch (error) {
        console.error("Error executing delete_match:", error);
        res.status(500).send(`An error occurred while deleting the match with id: ${matchID}`);
    }
}

const update_match = async (req, res) => {
    try {
        const match_id = req.params.id;
        const { location_id, winner_id, match_status, end_datetime } = req.body;

        // clean up data
        const safe_location_id = location_id === "" ? null : location_id;
        const safe_winner_id = winner_id === "" ? null : winner_id;

        let safe_end_datetime = null;
        if (end_datetime && end_datetime !== "") {
            safe_end_datetime = end_datetime.replace('T', ' ') + '.00';
        }

        const query = `
            UPDATE matches
            SET location_id = ?,
                winner_id = ?,
                match_status = ?,
                end_datetime = ?
            WHERE match_id = ?;
        `

        const values = [safe_location_id, safe_winner_id, match_status, safe_end_datetime, match_id];

        await db.query(query, values);

        res.status(200).send("Match updated successfully");

    } catch (error) {
        console.error("Error updating match:", error);
        res.status(500).send("An error occurred while updating the match.");
    }
}

module.exports = {
    get_all_matches,
    get_all_match_locations,
    get_all_match_people,
    delete_match,
    update_match
}