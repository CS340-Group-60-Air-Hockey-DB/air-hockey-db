const db = require('../database/db-connector');
const all_triggers = require('../database/triggers/all_triggers');

const reset_database = async (req, res) => {
    const query = `CALL sp_reset_db();
        ${all_triggers}
    `;

    db.pool.query(query, async (error, results) => {
        if (error) {
            console.error("Error executing ResetDB procedure:", error);
            res.status(500).json({ error: "Failed to reset database." });
        } else {
            console.log("Database reset successful.");
            res.status(200).json({ message: "Database reset successfully!" });
        }
    });
};

module.exports = { reset_database };