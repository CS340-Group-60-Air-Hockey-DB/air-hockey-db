import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import People from './pages/People';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = process.env.PORT_BACKEND || 63729;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/people" element={<People backendURL={backendURL} />} />
                <Route path='/locations' element={null} />
                <Route path='/matches' element={null} />
                <Route path='/match_officials' element={null} />
                <Route path='/player_matches' element={null} />
                <Route path='/sets' element={null} />
                <Route path='/games' element={null} />
            </Routes>
        </>
    );

} export default App;
