// Database
const db = require('../database/db-connector');
const game_queries = require('../database/queries/games.js');


const create_game = async (req, res) => {
    const { set_id, game_num, player_1_score, player_2_score, game_status, start_datetime, end_datetime } = req.body

    const sp_query = `CALL sp_add_game (?, ?, ?, ?, ?, ?, ?, @game_id, @error_message);
                        SELECT @game_id, @error_message;`

    const values = [set_id, game_num, player_1_score, player_2_score, game_status, start_datetime, end_datetime]

    try {
        const add_res = await db.query(sp_query, values);

        if (add_res[0][1][0]['@error_message'] !== null) {
            return res.status(400).json({
                message: `There was an error with adding the game.`,
                error: add_res[0][1][0]['@error_message']
            })
        }

        return res.status(201).json({
            message: "Game added successfully",
            person_id: add_res[0][1][0]['@person_id']
        });
    }
    catch (error) {
        if (error.sqlState === "45000") {
            return res.status(400).json({
                message: `An error occurred while adding the game due to the request body.`,
                error
            })
        }

        return res.status(500).send({
            message: "An error occurred while adding the game.",
            error
        });
    }
}

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
    create_game,
    get_all_games
};