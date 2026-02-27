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

// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_PORT_BACKEND || 63729;
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://classwork.engr.oregonstate.edu'

const backendURL = `${backend_url}:${backendPort}`;

function App() {
  const userLocale = navigator.language

    // React Global App States
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

  
    useEffect(() => {
          const getPeople = async function () {
              try {
                  // Make a GET request to the backend
                  const response = await fetch(backendURL + '/people');
                  
                  // Convert the response into JSON format
                  const people = await response.json();
          
                  // Update the people state with the response data
                  setPeople(people);
                  
              } catch (error) {
                  // If the API call fails, print the error to the console
                  console.log('Error:', error);
              }
          };

        const getMatches = async () => {
            try{
                const res = await fetch(backendURL + '/matches')

                let data = await res.json()
                data.sort((a, b) => a.match_id - b.match_id)

                setMatches(data)
            }
            catch(error){
                console.log('Error:', error)
            }
        }

        const getSets = async () => {
            try{
                const res = await fetch(backendURL + '/sets')

                let data = await res.json()

                setSets(data)
            }
            catch(error){
                console.log('Error:', error)
            }
        }

          
        if(people?.length === 0){
            getPeople()
        }
        if(matches?.length === 0){
            getMatches()
        }
        if(sets?.length === 0){
            getSets()
        }
      }, [backendURL]);

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
                        setResetPopup={setResetPopup}
                    />
            }
        </>
    );

} export default App;
