import React, { useEffect, useState } from 'react';
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
import getPeople from './fetch_funcs/people/getPeople';
import getLocations from './fetch_funcs/locations/getLocations';
import getMatches from './fetch_funcs/matches/getMatches';
import getSets from './fetch_funcs/sets/getSets';

// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_PORT_BACKEND || 63729;
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://classwork.engr.oregonstate.edu'

const backendURL = `${backend_url}:${backendPort}`;


function App() {
  const userLocale = navigator.language

    // React Global App States
    // Table States
    const [locations, setLocations] = useState([]);
    const [matches, setMatches] = useState([])
    const [people, setPeople] = useState([]);
    const [sets, setSets] = useState([])
    // User States
    const [userLocation, setUserLocation] = useState('')

  
    useEffect(() => {
       if(people?.length === 0){
            getPeople(backendURL, setPeople)
        }
        if(locations?.length === 0){
            getLocations(backendURL, setLocations)
        }
        if(matches?.length === 0){
            getMatches(backendURL, setMatches)
        }
        if(sets?.length === 0){
            getSets(backendURL, setSets)
        }
      }, [backendURL]);

    return (
        <>
            <Navigation location={userLocation.pathname}/>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Home 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                        />
                    } 
                />
                <Route 
                    path="/people" 
                    element={
                        <People 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            people={people}
                        />
                } 
                />
                <Route 
                    path='/locations' 
                    element={
                        <Locations 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            people={people}
                            locations={locations}
                        />
                    } 
                />
                <Route 
                    path='/matches' 
                    element={
                        <Matches 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            people={people}
                            matches={matches}
                        />
                    }
                />
                <Route 
                    path='/match_officials' 
                    element={
                        <MatchOfficials 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            matches={matches}
                            people={people}
                            sets={sets}
                        />
                    }
                />
                <Route 
                    path='/player_matches' 
                    element={
                        <PlayerMatches 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale}
                            people={people} 
                            matches={matches}
                        />
                    }
                />
                <Route 
                    path='/sets' 
                    element={
                        <Sets 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            matches={matches}
                            sets={sets}
                        />
                    }
                />
                <Route 
                    path='/games' 
                    element={
                        <Games 
                            backendURL={backendURL} 
                            setUserLocation={setUserLocation} 
                            locale={userLocale} 
                            matches={matches}
                            sets={sets}
                        />
                    }
                />
            </Routes>
            <Footer />
        </>
    );

} export default App;
