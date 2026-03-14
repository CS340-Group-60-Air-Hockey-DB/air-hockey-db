const express = require('express')
const router = express.Router()

const { add_person, get_all_people, update_person_by_id } = require("../controllers/people")


router
    .get('/', get_all_people)
    .post('/', add_person)
    .put('/:person_id', update_person_by_id)

module.exports = router