// Database
const db = require('../database/db-connector');
const location_queries = require('../database/queries/locations')


const get_all_locations = async (req, res) => {
    try {
        const query1 = location_queries.select_all
        const [locations] = await db.query(query1);

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }

}


module.exports = {
    get_all_locations
}