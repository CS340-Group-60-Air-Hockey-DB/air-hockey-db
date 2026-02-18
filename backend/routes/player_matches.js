const express = require('express');
const router = express.Router();

const controller = require('../controllers/player_matches.js');

router.post('/', controller.create_player_match);

// read all
router.get('/', controller.get_all_player_matches);

// read filtered
router.get('/player/:id', controller.get_by_player_id);
router.get('/match/:id', controller.get_by_match_id);

router.put('/:id', controller.update_player_match);

router.delete('/:id', controller.delete_player_match);

module.exports = router;