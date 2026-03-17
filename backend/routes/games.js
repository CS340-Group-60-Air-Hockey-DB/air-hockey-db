const express = require('express')
const router = express.Router()

const { create_game, delete_game_by_id, get_all_games, update_game_by_id } = require("../controllers/games")

router
    .get('/', get_all_games)
    .post('/', create_game)
    .delete('/:id', delete_game_by_id)
    .put('/:id', update_game_by_id)

module.exports = router