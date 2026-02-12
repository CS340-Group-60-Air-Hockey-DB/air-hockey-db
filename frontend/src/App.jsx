import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import People from './pages/People';
import Locations from './pages/Locations';
import Matches from './pages/Matches';
import PlayerMatches from './pages/Player_Matches';
import Sets from './pages/Sets';
import Games from './pages/Games';
import MatchOfficials from './pages/Match_Officials';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = import.meta.env.PORT_BACKEND || 63729;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/people" element={<People backendURL={backendURL} />} />
                <Route path='/locations' element={<Locations backendURL={backendURL} />} />
                <Route path='/matches' element={<Matches backendURL={backendURL} />} />
                <Route path='/match_officials' element={<MatchOfficials backendURL={backendURL} />} />
                <Route path='/player_matches' element={<PlayerMatches backendURL={backendURL} />} />
                <Route path='/sets' element={<Sets backendURL={backendURL} />} />
                <Route path='/games' element={<Games backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
