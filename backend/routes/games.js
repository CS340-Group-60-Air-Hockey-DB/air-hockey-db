const express = require('express')
const router = express.Router()

const { get_all_games } = require("../controllers/games")

router
    .get('/', get_all_games)

module.exports = router