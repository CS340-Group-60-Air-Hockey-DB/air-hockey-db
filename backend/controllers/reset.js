const db = require('../database/db-connector');

const reset_database = (req, res) => {
    const query = `CALL sp_reset_db();`;

    db.pool.query(query, (error, results) => {
        if (error) {
            console.error("Error executing ResetDB procedure:", error);
            res.status(500).json({ error: "Failed to reset database."});
        } else {
            console.log("Database reset successful.");
            res.status(200).json({ message: "Database reset successfully!" });
        }
    });
};

module.exports = { reset_database };