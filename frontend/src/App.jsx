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

// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_PORT_BACKEND || 63729;
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://classwork.engr.oregonstate.edu'

const backendURL = `${backend_url}:${backendPort}`;


function App() {
  const userLocale = navigator.language

    // React Global App States
    const [userLocation, setUserLocation] = useState('')
    const [matches, setMatches] = useState([])
    const [people, setPeople] = useState([]);
    const [sets, setSets] = useState([])
  
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
