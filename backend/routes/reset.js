const express = require('express');
const router = express.Router();
const { reset_database } = require('../controllers/reset');

router.post('/', reset_database);

module.exports = router;