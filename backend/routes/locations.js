const express = require('express')
const router = express.Router()
const locationsController = require('../controllers/locations');


router
    .get('/', locationsController.get_all_locations)
    .post('/', locationsController.create_location)
    .put('/:id', locationsController.update_location);


module.exports = router;