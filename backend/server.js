//Citation for the following file:
//Date: 2/12/2026
//Adapted from CS 340 starter code

// ########################################
// ########## SETUP
require('dotenv').config()

const peopleRoutes = require('./routes/people')

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = process.env.PORT_BACKEND || 63729;

// ########################################
// ########## ROUTE HANDLERS

// ENDPOINTS
app.use('/people', peopleRoutes)

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
