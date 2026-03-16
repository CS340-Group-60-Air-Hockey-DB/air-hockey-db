// Database
const db = require('../database/db-connector');
const match_official_queries = require('../database/queries/match_officials.js');

const get_all_match_officials = async (req, res) => {
    try {
        const [officials] = await db.query(match_official_queries.select_all);

        // send data to frontend
        res.status(200).json(officials);

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

const create_match_official = async(req, res) => {
    try {
        const { official_person_id, set_id, official_type } = req.body;

        const query = `CALL sp_add_match_official(?, ?, ?)`;
        const values = [official_person_id, set_id, official_type];

        const [result] = await db.query(query, values);
        const newMatchOfficialId = result[0][0].insertId;

        res.status(201).json({ message: "Match official added!", id: newMatchOfficialId });

    } catch (error) {
        console.error("Error creating match official:", error);
        res.status(500).send("An error occurred whlie adding the match official.");
    }
}

const update_match_official = async (req, res) => {
    try {
        const match_official_id = req.params.id;
        const { official_person_id, set_id, official_type } = req.body;

        const query = `CALL sp_update_match_official(?, ?, ?, ?)`;
        const values = [official_person_id, set_id, official_type, match_official_id];

        await db.query(query, values);

        res.status(200).json({ message: "Update successful" });

    } catch (error) {
        console.error("Error updating match official:", error);
        res.status(500).send("An error occurred while updating the match official.");
    }
}

const delete_match_official = async (req, res) => {
    try {
        const match_official_id = req.params.id;

        const query = `CALL sp_delete_match_official(?)`;
        await db.query(query, [match_official_id]);

        res.status(204).send();

    } catch(error) {
        console.error("Error deleting match official:", error);
        res.status(500).send("An error occurred while deleting the match official.");
    }
}

module.exports = {
    get_all_match_officials,
    create_match_official,
    update_match_official,
    delete_match_official
};