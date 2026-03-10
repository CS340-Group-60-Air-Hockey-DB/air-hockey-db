const express = require('express')
const router = express.Router()

const { get_all_people, add_person } = require("../controllers/people")


router
    .get('/', get_all_people)
    .post('/', add_person)


module.exports = router