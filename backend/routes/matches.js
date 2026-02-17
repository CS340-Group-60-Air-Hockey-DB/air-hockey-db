const express = require('express')
const router = express.Router()

const { get_all_matches } = require("../controllers/matches")


router
    .get('/', get_all_matches)


module.exports = router