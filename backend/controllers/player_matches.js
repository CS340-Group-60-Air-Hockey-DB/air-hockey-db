const db = require('../database/db-connector');
const player_match_queries = require('../database/queries/player_matches.js');

const create_player_match = async (req, res) => {
    try {
        const { player_id, match_id, starting_side, player_order } = req.body;

        const query = `CALL sp_add_player_match(?, ?, ?, ?)`;
        const values = [player_id, match_id, starting_side, player_order];

        const [result] = await db.query(query, values);
        const newPlayerMatchId = result[0][0].insertId;

        res.status(201).json({ message: "Player match created!", id: newPlayerMatchId });

    } catch (error) {
        res.status(500).send("An error occurred while creating the player match.");
    }
}

const get_all_player_matches = async (req, res) => {
    try {
        const [results] = await db.query(player_match_queries.select_all);

        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("An error occurred while fetching player matches.");
    }
}

const get_by_player_id = async (req, res) => {
    try {
        const player_id = req.params.id;
        const [results] = await db.query(player_match_queries.select_by_player_id, [player_id]);
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send("An error occurred while fetching matches for this player.");
    }
}

const get_by_match_id = async (req, res) => {
    try {
        const match_id = req.params.id;
        const [results] = await db.query(player_match_queries.select_by_match_id, [match_id]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send("An error occurred while fetching players for this match.");
    }
}

const update_player_match = async (req, res) => {
    try {
        const player_match_id = req.params.id;
        const { player_id, match_id, starting_side, player_order } = req.body;

        const query = `CALL sp_update_player_match(?, ?, ?, ?, ?)`;
        const values = [player_id, match_id, starting_side, player_order, player_match_id];

        await db.query(query, values);

        res.status(200).json({ message: "Update successful" });

    } catch (error) {
        res.status(500).send("An error occurred while updating the player match.");
    }
}

const delete_player_match = async (req, res) => {
    try {
        const player_match_id = req.params.id;

        const query = `CALL sp_delete_player_match(?)`;
        await db.query(query, [player_match_id]);
        
        res.status(204).send();

    } catch (error) {
        res.status(500).send("An error occurred while deleting the player match.");
    }
}

module.exports = {
    create_player_match,
    get_all_player_matches,
    get_by_player_id,
    get_by_match_id,
    update_player_match,
    delete_player_match
}