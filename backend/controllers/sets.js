const db = require('../database/db-connector');
const set_queries = require('../database/queries/sets.js');

const create_set = async (req, res) => {
    try {
        const {
            match_id,
            winner_id,
            set_num,
            start_datetime,
            end_datetime,
            set_status
        } = req.body;

        // safe variables for optional fields
        const safe_winner_id = !winner_id || winner_id === "" ? null : winner_id;
        const safe_end_datetime = !end_datetime || end_datetime === "" ? null : end_datetime;
        const safe_start_datetime = !start_datetime || start_datetime === "" ? new Date() : start_datetime;

        // backend validation
        if (!match_id || isNaN(match_id) || parseInt(match_id) <= 0) {
            return res.status(400).json({
                message: "match_id must be a positive integer."
            });
        }

        if (!set_num || isNaN(set_num) || parseInt(set_num) <= 0) {
            return res.status(400).json({
                message: "set_num must be a positive integer."
            });
        }

        if (!set_status) {
            return res.status(400).json({
                message: "set_status is required."
            });
        }

        const query = `
            CALL sp_add_set(?, ?, ?, ?, ?, ?, @set_id, @error_message);
            SELECT @set_id AS set_id, @error_message AS error_message;
        `;

        const values = [
            match_id,
            safe_winner_id,
            set_num,
            safe_start_datetime,
            safe_end_datetime,
            set_status
        ];

        const [result] = await db.query(query, values);
        const outcome = result[1][0];

        if (outcome.error_message !== null) {
            return res.status(400).json({ message: outcome.error_message });
        }

        res.status(201).json({
            message: "Set created successfully.",
            id: outcome.set_id
        });

    } catch (error) {
        if (error.sqlState === "45000") {
            return res.status(400).json({ message: error.sqlMessage });
        }

        res.status(500).json({ message: "Failed to create set", error: error.message || error });
    }
};

const get_all_sets = async (req, res) => {
    try {
        const [sets] = await db.query(set_queries.select_all);

        res.status(200).json(sets);

    } catch (error) {
        res.status(500).json({ error: "An error occured while executing the database queries."});
    }
}

const get_set_by_id = async (req, res) => {
    try {
        const set_id = req.params.id;

        const [set] = await db.query(set_queries.select_by_id, [set_id]);

        if (set.length === 0) {
            return res.status(404).json({ message: "Set not found" });
        }

        res.status(200).json(set[0]);

    } catch (error) {
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }

}

const update_set = async (req, res) => {
    try {
        const set_id = req.params.id;
        const {
            match_id,
            winner_id,
            set_num,
            start_datetime,
            end_datetime,
            set_status
        } = req.body;

        // get current set for default values if req.body is missing anything
        let curr_set = await db.query(set_queries.select_by_id, [set_id]);
        if (curr_set[0].length === 0) {
            return res.status(404).json({ message: "Set not found." });
        }
        curr_set = curr_set[0][0];

        let safe_match_id = match_id ? parseInt(match_id) : curr_set.match_id;
        let safe_winner_id = winner_id === "" ? null : (winner_id || curr_set.winner_id);
        let safe_set_num = set_num ? parseInt(set_num) : curr_set.set_num;
        let safe_start_datetime = start_datetime ? start_datetime : curr_set.start_datetime;
        let safe_end_datetime = end_datetime === "" ? null : (end_datetime || curr_set.end_datetime);
        let safe_set_status = set_status ? set_status : curr_set.set_status;

        const query = `
            CALL sp_update_set(?, ?, ?, ?, ?, ?, ?, @rows_affected, @error_message);
            SELECT @rows_affected AS rowsAffected, @error_message AS errorMessage;
        `;

        const values = [set_id, safe_match_id, safe_winner_id, safe_set_num, safe_start_datetime, safe_end_datetime, safe_set_status];

        const [result] = await db.query(query, values);
        const outcome = result[1][0];

        if (outcome.rowsAffected < 1) {
            return res.status(400).json({
                message: "There was an error updating the set.",
                error: outcome.errorMessage
            });
        }

        res.status(200).json({ message: "Update successful" });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while executing the set.", error: error.message || error });
    }
}

const delete_set = async (req, res) => {
    try {
        const set_id = req.params.id;
        const query = `
            SET @rows_affected = 0;
            SET @error_message = '';
            CALL sp_delete_set(?, @rows_affected, @error_message);
            SELECT @rows_affected AS rowsAffected, @error_message AS errorMessage;
        `;

        const [results] = await db.query(query, [set_id]);
        const outcome = results[3][0];

        if (outcome.rowsAffected === -99) {
            return res.status(400).json({ error: outcome.errorMessage });
        }

        res.status(200).json({ message: "Set deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: "An error occurred while executing the database queries."});
    }
}

module.exports = {
    create_set,
    get_all_sets,
    get_set_by_id,
    update_set,
    delete_set
}