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

module.exports = {
    get_all_match_officials
};