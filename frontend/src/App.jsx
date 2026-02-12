import React, { useState } from 'react';
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
import Footer from './components/Footer';

// Define the backend port and URL for API requests
const backendPort = import.meta.env.PORT_BACKEND || 63729;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const [location, setLocation] = useState('')

    return (
        <>
            <Navigation location={location.pathname}/>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home setLocation={setLocation} />} 
                />
                <Route 
                    path="/people" 
                    element={<People backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/locations' 
                    element={<Locations backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/matches' 
                    element={<Matches backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/match_officials' 
                    element={<MatchOfficials backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/player_matches' 
                    element={<PlayerMatches backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/sets' 
                    element={<Sets backendURL={backendURL} setLocation={setLocation} />} 
                />
                <Route 
                    path='/games' 
                    element={<Games backendURL={backendURL} setLocation={setLocation} />} 
                />
            </Routes>
            <Footer />
        </>
    );

} export default App;
