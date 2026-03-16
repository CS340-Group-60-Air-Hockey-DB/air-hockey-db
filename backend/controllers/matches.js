// Database
const db = require('../database/db-connector');
const match_queries = require('../database/queries/matches.js');
const create_matches_with_fks = require('../database/views/matches_with_fks.js');
const { set_max_arr, faceoff_type_arr, match_type_arr, match_status_arr } = require('../ common_variables.js');


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

const get_sets_and_games_by_match_id = async (req, res) => {
    const { id } = req.params

    try {
        let [match_sets] = await db.query(match_queries.select_sets_by_match_id, id)

        if (match_sets.length === 0) {
            return res.status(404).json({
                message: 'No sets found for this match.'
            });
        }

        let [set_games] = await db.query(match_queries.select_games_by_match_id, id)

        // Group games by the set number
        const games_per_set = set_games.reduce((acc, game) => {
            const { set_id, ...gameData } = game;

            if (!acc[set_id]) {
                acc[set_id] = []
            }

            acc[set_id].push(gameData)

            return acc;
        }, {});

        // Combine the set details with the games for that set number
        const match_details = match_sets.map(set => ({
            ...set,
            games: games_per_set[set.set_id] || []
        }));

        return res.status(200).json(match_details)
    }
    catch (error) {
        return res.status(500).send({
            message: `An error occurred while getting the sets and games for the match: ${id}`,
            error
        });
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
        const { location_id, match_status, end_datetime, set_max, faceoff_type, start_datetime, match_type, note } = req.body;

        // Get current match for default values if the req.body does not update an attribute's data:
        let curr_match = await db.query(match_queries.select_by_id, match_id)
        curr_match = curr_match[0][0]

        // clean up data
        let safe_end_datetime = end_datetime ?
            end_datetime : curr_match.end_datetime

        let safe_faceoff_type = faceoff_type ?
            faceoff_type_arr.find(elem => elem === faceoff_type) : curr_match.faceoff_type

        const safe_location_id = location_id === "" ?
            curr_match.location_id : location_id;

        let safe_match_status = match_status ?
            match_status_arr.find(elem => elem === match_status) : curr_match.match_status

        let safe_match_type = match_type ?
            match_type_arr.find(elem => elem === match_type) : curr_match.match_type

        let safe_note = note ?? curr_match.note

        let safe_set_max = set_max ?
            parseInt(set_max) : curr_match.set_max

        let safe_start_datetime = start_datetime ?
            start_datetime : curr_match.start_datetime


        if (safe_end_datetime === '') {
            return res.status(400).json({
                message: `end_datetime must be a datetime value`
            })
        }
        if (!safe_faceoff_type) {
            return res.status(400).json({
                message: `faceoff_type must be one of ${faceoff_type_arr.join(', ')}`
            })
        }
        if (!safe_match_status) {
            return res.status(400).json({
                message: `match_status must be one of ${match_status_arr.join(', ')}`
            })
        }
        if (!safe_match_type) {
            return res.status(400).json({
                message: `match_type must be one of ${match_type_arr.join(', ')}`
            })
        }
        // Null values are allowed for notes
        if (safe_note) {
            if (typeof (note) !== 'string') {
                return res.status(400).json({
                    message: `note must be a string value`
                })
            }
        }
        // If parseInt is undefined and finding set max is undefined
        if (!safe_set_max && !set_max_arr.find(elem => elem === safe_set_max)) {
            return res.status(400).json({
                message: `set_max must be either ${set_max_arr.join(', ')}`
            })
        }
        if (!safe_start_datetime || safe_start_datetime === '') {
            return res.status(400).json({
                message: `start_datetime must be a datetime value`
            })
        }

        const query = `CALL sp_update_match (?, ?, ?, ?, ?, ?, ?, ?, ?, @rows_affected, @error_message);
        SELECT @rows_affected, @error_message;`

        const values = [match_id, safe_set_max, safe_faceoff_type, safe_start_datetime, safe_end_datetime, safe_location_id, safe_match_type, safe_note, safe_match_status];

        const res_update = await db.query(query, values);

        if (res_update[0][1][0]['@rows_affected'] < 1) {
            return res.status(400).json({
                message: `There was an error with updating the match`,
                error: res_update[0][1][0]['@error_message']
            })
        }

        return res.status(200).send("Match updated successfully");

    } catch (error) {
        if (error.sqlState === "45000") {
            return res.status(404).json({
                message: `match with id: ${match_id} could not be found`,
                error
            })
        }
        if (error.sqlState === "42000") {
            return res.status(400).json({
                message: `An error occurred while updating the match.`,
                error
            })
        }

        return res.status(500).send({
            message: "An error occurred while updating the match.",
            error
        });
    }
}

const create_match = async (req, res) => {
    try {
        const {
            location_id,
            set_max,
            faceoff_type,
            start_datetime,
            end_datetime,
            match_type,
            match_status,
            note
        } = req.body;

        const safe_end_datetime = !end_datetime || end_datetime === "" ? null : end_datetime;
        const safe_note = !note || note === "" ? null : note;
        const safe_start_datetime = !start_datetime || start_datetime === "" ? new Date() : start_datetime;

        //backend validation
        if (!location_id || isNaN(location_id) || parseInt(location_id) <= 0) {
            return res.status(400).json({
                message: "location_id must be a positive integer."
            });
        }

        if (isNaN(new Date(safe_start_datetime).getTime())) {
            return res.status(400).json({
                message: "start_datetime must be a valid datetime value."
            });
        }

        const query = `
            CALL sp_add_match(?, ?, ?, ?, ?, ?, ?, ?, @match_id);
            SELECT @match_id AS match_id;
        `;

        const values = [
            set_max,
            faceoff_type,
            safe_start_datetime,
            safe_end_datetime,
            location_id,
            match_type,
            safe_note,
            match_status
        ];

        const [result] = await db.query(query, values);
        const outcome = result[1][0];

        if (outcome.match_id === -99) {
            return res.status(400).json({ error: "A database error occurred while creating the match." });
        }

        res.status(201).json({ message: "Match created successfully!", id: outcome.insertId });

    } catch (error) {
        res.status(500).json({ error, message: "Failed to create match" });
    }
};

module.exports = {
    get_all_matches,
    get_all_match_locations,
    get_all_match_people,
    get_sets_and_games_by_match_id,
    delete_match,
    update_match,
    create_match
}