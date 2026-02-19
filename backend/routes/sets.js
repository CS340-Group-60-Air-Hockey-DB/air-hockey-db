const express = require('express');
const router = express.Router();

const sets_controller = require('../controllers/sets.js');

router.get('/', sets_controller.get_all_sets);

router.get('/:id', sets_controller.get_set_by_id);

router.put('/:id', sets_controller.update_set);

router.delete('/:id', sets_controller.delete_set);

module.exports = router;