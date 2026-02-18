const express = require('express');
const router = express.Router();

const { get_all_people_locations } = require("../controllers/people_locations");

router
    .get('/', get_all_people_locations);

module.exports = router;