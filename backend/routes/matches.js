const express = require('express')
const router = express.Router()

const { get_all_matches, get_all_match_locations, get_all_match_people } = require("../controllers/matches")


router
    .get('/', get_all_matches)
    .get('/locations', get_all_match_locations)
    .get('/players', get_all_match_people)


module.exports = router