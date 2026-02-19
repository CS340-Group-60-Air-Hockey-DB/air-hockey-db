// Database
const db = require('../database/db-connector');
const people_location_queries = require('../database/queries/people_locations.js');

const get_all_people_locations = async (req, res) => {
    try{
        const [results] = await db.query(people_location_queries.select_all);

        // send data to frontend
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

module.exports = {
    get_all_people_locations
};