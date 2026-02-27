const express = require('express');
const router = express.Router();
const { reset_database } = require('../controllers/reset');

router.get('/', reset_database);

module.exports = router;