const express = require('express')
const router = express.Router()

const {
    get_all_matches,
    get_all_match_locations,
    get_all_match_people,
    delete_match,
    update_match,
    create_match,
    get_sets_and_games_by_match_id
} = require("../controllers/matches")


router
    .get('/', get_all_matches)
    .get('/locations', get_all_match_locations)
    .get('/players', get_all_match_people)
    .delete('/:id', delete_match)
    .put('/:id', update_match)
    .get('/:id/details', get_sets_and_games_by_match_id)
    .post('/', create_match);


module.exports = router