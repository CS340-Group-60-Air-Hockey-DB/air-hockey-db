// Database
const db = require('../database/db-connector');
const location_queries = require('../database/queries/locations')
const create_locations_with_owners = require('../database/views/locations_with_owners.js')


const get_all_locations = async (req, res) => {
    try {
        // Create locations_with_owners View
        await db.query(create_locations_with_owners)

        const [locations] = await db.query(location_queries.select_all);

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }

}


module.exports = {
    get_all_locations
}