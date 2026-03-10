import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

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
import Navigation from './components/navigation/Navigation';
import Footer from './components/Footer';
import ResetPopup from './components/navigation/ResetPopup';

// Fetch Functions
import getPeople from './fetch_funcs/people/getPeople';
import getLocations from './fetch_funcs/locations/getLocations';
import getMatches from './fetch_funcs/matches/getMatches';
import getSets from './fetch_funcs/sets/getSets';
import getGames from './fetch_funcs/games/getGames';
import getMatchOfficials from './fetch_funcs/match_officials/getMatchOfficials';
import getPlayerMatches from './fetch_funcs/player_matches/getPlayerMatches';


// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_PORT_BACKEND || 63729;
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://classwork.engr.oregonstate.edu'

const backendURL = `${backend_url}:${backendPort}`;

function App() {
    const userLocale = navigator.language

    // React Global App States
    // Step 4 instructions - will take out for step 5 and beyond
    const [instructionModal, setInstructionModal] = useState(false)

    // Table States
    const [games, setGames] = useState([])
    const [locations, setLocations] = useState([]);
    const [matches, setMatches] = useState([])
    const [matchOfficials, setMatchOfficials] = useState([]);
    const [people, setPeople] = useState([]);
    const [playerMatches, setPlayerMatches] = useState([]);
    const [sets, setSets] = useState([])

    // Reset Database State
    const [resetPopup, setResetPopup] = useState(false)
 
    const refreshData = useCallback(() => {
        getPeople(backendURL, setPeople);
        getLocations(backendURL, setLocations);
        getMatches(backendURL, setMatches);
        getMatchOfficials(backendURL, setMatchOfficials)
        getSets(backendURL, setSets);
        getGames(backendURL, setGames);
        getPlayerMatches(backendURL, setPlayerMatches)
    }, []);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const userLocation = useLocation();

    return (
        <>
            <Navigation 
                location={userLocation.pathname}
                setResetPopup={setResetPopup}
            />
            
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Home  
                            locale={userLocale} 
                            instructionModal={instructionModal}
                            setInstructionModal={setInstructionModal}
                        />
                    } 
                />
                <Route 
                    path="/people" 
                    element={
                        <People 
                            backendURL={backendURL}  
                            locale={userLocale} 
                            people={people}
                            refreshData={refreshData}
                        />
                } 
                />
                <Route 
                    path='/locations' 
                    element={
                        <Locations 
                            backendURL={backendURL}  
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
                            locale={userLocale} 
                            people={people}
                            matches={matches}
                            locations={locations}
                            refreshData={refreshData}
                        />
                    }
                />
                <Route 
                    path='/match_officials' 
                    element={
                        <MatchOfficials 
                            backendURL={backendURL}  
                            locale={userLocale} 
                            matches={matches}
                            matchOfficials={matchOfficials}
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
                            locale={userLocale}
                            people={people} 
                            matches={matches}
                            playerMatches={playerMatches}
                        />
                    }
                />
                <Route 
                    path='/sets' 
                    element={
                        <Sets 
                            backendURL={backendURL}  
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
                            locale={userLocale} 
                            matches={matches}
                            sets={sets}
                            games={games}
                        />
                    }
                />
            </Routes>
            <Footer />

            {
                resetPopup && 
                    <ResetPopup 
                        backendURL={backendURL}
                        setResetPopup={setResetPopup}
                        refreshData={refreshData}
                    />
            }
        </>
    );

} export default App;
