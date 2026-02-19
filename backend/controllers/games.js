// Database
const db = require('../database/db-connector');
const game_queries = require('../database/queries/games.js');

const get_all_games = async (req, res) => {
    try {
        const [games] = await db.query(game_queries.select_all);
        
        // send data to frontend
        res.status(200).json(games);

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

module.exports = {
    get_all_games
};