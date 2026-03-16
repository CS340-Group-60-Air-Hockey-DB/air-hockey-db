const express = require('express');
const router = express.Router();
const matchOfficialsController = require('../controllers/match_officials');

router.get('/', matchOfficialsController.get_all_match_officials);
router.post('/', matchOfficialsController.create_match_official);
router.put('/:id', matchOfficialsController.update_match_official);
router.delete('/:id', matchOfficialsController.delete_match_official);

module.exports = router;