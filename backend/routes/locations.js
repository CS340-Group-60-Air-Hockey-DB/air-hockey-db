const express = require('express')
const router = express.Router()

const { get_all_locations } = require("../controllers/locations")


router
    .get('/', get_all_locations)


module.exports = router