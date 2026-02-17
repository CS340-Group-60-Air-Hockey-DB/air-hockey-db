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
const backendPort = import.meta.env.VITE_PORT_BACKEND || 63729;
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://classwork.engr.oregonstate.edu'

const backendURL = `${backend_url}:${backendPort}`;


function App() {
  const [location, setLocation] = useState('')
  const userLocale = navigator.language

    return (
        <>
            <Navigation location={location.pathname}/>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path="/people" 
                    element={<People backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/locations' 
                    element={<Locations backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/matches' 
                    element={<Matches backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/match_officials' 
                    element={<MatchOfficials backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/player_matches' 
                    element={<PlayerMatches backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/sets' 
                    element={<Sets backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
                <Route 
                    path='/games' 
                    element={<Games backendURL={backendURL} setLocation={setLocation} locale={userLocale} />} 
                />
            </Routes>
            <Footer />
        </>
    );

} export default App;
