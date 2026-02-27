const express = require('express')
const router = express.Router()

const { reset_db } = require('../controllers/db')


router
    .post('/reset', reset_db)

module.exports = router