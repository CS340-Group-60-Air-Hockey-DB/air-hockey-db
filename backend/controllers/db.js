// Database
const db = require('../database/db-connector');

const reset_db = async (req, res) => {
    try {
        await db.query(`CALL sp_reset_db;`);

        // send data to frontend
        return res.status(204).end();

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

module.exports = {
    reset_db
};