import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import People from './pages/People';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 63729;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/people" element={<People backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
