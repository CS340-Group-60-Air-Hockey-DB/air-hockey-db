const express = require('express')
const router = express.Router()

const { create_game, get_all_games } = require("../controllers/games")

router
    .get('/', get_all_games)
    .post('/', create_game)

module.exports = router