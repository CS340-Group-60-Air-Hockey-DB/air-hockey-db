// Database
const db = require('../database/db-connector');
const match_queries = require('../database/queries/matches.js');
const create_matches_with_fks = require('../database/views/matches_with_fks.js');


const get_all_matches = async (req, res) => {
    try {
        // Create matches_with_fks View
        await db.query(create_matches_with_fks)

        const [matches] = await db.query(match_queries.select_all_view);

        res.status(200).json(matches);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }
}

const get_all_match_locations = async (req, res) => {
    try {
        const [locations] = await db.query(match_queries.select_all_match_locations);

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }
}

const get_all_match_people = async (req, res) => {
    try {
        const [people] = await db.query(match_queries.select_all_match_people);

        res.status(200).json(people);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }
}


module.exports = {
    get_all_matches,
    get_all_match_locations,
    get_all_match_people
}