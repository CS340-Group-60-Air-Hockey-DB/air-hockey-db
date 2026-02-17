const express = require('express')
const router = express.Router()

const { get_all_people } = require("../controllers/people")


router
    .get('/', get_all_people)


module.exports = router