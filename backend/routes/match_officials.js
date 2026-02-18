const express = require('express');
const router = express.Router();

const { get_all_match_officials } = require("../controllers/match_officials");

router
    .get('/', get_all_match_officials);

module.exports = router;