//Citation for the following file:
//Date: 2/12/2026
//Adapted from CS 340 starter code

// ########################################
// ########## SETUP
require('dotenv').config()

const people_routes = require('./routes/people')
const location_routes = require('./routes/locations')
const match_routes = require('./routes/matches')
const sets_routes = require('./routes/sets')
const game_routes = require('./routes/games')
const match_official_routes = require('./routes/match_officials')
const player_match_routes = require('./routes/player_matches')
const people_location_routes = require('./routes/people_locations')

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
// Health Endpoint
app.get('/', (req, res) => {
    return res.status(200).json("Health endpoint check")
})

app.use('/people', people_routes)
app.use('/locations', location_routes)
app.use('/matches', match_routes)
app.use('/sets', sets_routes)
app.use('/games', game_routes)
app.use('/match_officials', match_official_routes)
app.use('/player_matches', player_match_routes)
app.use('/people_locations', people_location_routes)

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
