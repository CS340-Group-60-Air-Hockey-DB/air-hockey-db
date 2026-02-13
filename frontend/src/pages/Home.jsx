import { useLocation } from "react-router-dom";

function Home(props) {
    const { setLocation } = props
    const location = useLocation()

    setLocation(location)
    
    return (
        <>
            <h1>
                Competitive Air Hockey Database
            </h1>
            <div id="home-description">
                <p>
                    Air Hockey is a relatively new competitive sport and is played competitively (or at least has a competitive player living in the state) in 11 states, with the main three being North Carolina, Texas, and Illinois. State tournaments can range from 30-90+ competitors. The world tournaments have on average 90-100+ competitors. There are also weekly tournaments which take place mostly in the main three states and have between 10-40 competitors. Leagues are less common but are formatted as a weekly event that lasts about 2 months per season and usually have between 10-15 competitors.

                </p>

                <p>
                    Many players compete in multiple matches, sets, and games per event. This produces thousands of individual game records annually. Manual spreadsheets are not sufficient as they cannot reliably manage hundreds of players and games per season, thousands of games annually, and historical match and ranking data. Currently, Air Hockey uses multiple third-party apps, which can be confusing for both experts and novices of the sport. It creates unnecessary time upkeep and misinformation on players and tournaments.
                    </p>

                <p>
                    A database system is needed to: store player profiles and regional affiliations; record match, set, and game results; support multiple competition formats; enable accurate statistics, rankings, and historical queries; and scale as participation and events grow. One source of truth would help to grow the sport and streamline recording tournaments and matches. It would also allow for novices to become more involved as they will be able to use the app with ease. In the database, we are planning to initially record player information, matches, sets, games, and locations of tables. The database will be designed to be able to expand upon the initial implementation to record tournaments, leagues, and compute statistics.
                </p>
            </div>

            <h2>
                Page Descriptions
            </h2>
            
            <div id="page-descriptions">
                <div class='page-sections'>
                    <h3>
                        Air Hockey Community
                    </h3>
                    <p>
                        Browse and manage players, officials, and location owners in the air hockey community. Add, edit, or remove people from the database.
                </p>    
                </div>
                
                <div class='page-sections'>
                    <h3>
                        Locations
                    </h3>
                    <p>
                        Browse locations where Air Hockey tables can be found and includes locations for venues of tournaments. Track table quantities, associated owner or business, venue details, and tournament locations. Add, edit, or remove locations.
                    </p>
                </div>

                <div class='page-sections'>
                    <h3>
                        Matches
                    </h3>
                    <p>
                        Browse and manage competitive matches. View match details including location, type, status, and winner. Add, edit, or remove matches.
                    </p>
                </div>

                <div class='page-sections'>
                    <h3>
                        Player Matches
                    </h3>
                    <p>
                        View player participation in matches. See which players competed in each match, their starting positions, match scores, and outcomes. Add, edit, or remove player-match records.
                    </p>
                </div>

                <div class='page-sections'>
                    <h3>
                        Match Officials
                    </h3>
                    <p>
                        Browse and manage referees and witnesses assigned to sets. Track official assignments and roles. Add, edit, or remove official records.
                    </p>
                </div>

                <div class='page-sections'>
                    <h3>
                        Sets
                    </h3>
                    <p>
                        Browse and manage sets within matches. View set numbers, winners, status, and timing. Add, edit, or remove sets.
                    </p>
                </div>

                <div class='page-sections'>
                    <h3>
                        Games
                    </h3>
                    <p>
                        Browse and manage individual games within sets. View game scores, status, and timing for each game. Add, edit, or remove games.
                    </p>
                </div>
            </div>
        </>
    )
} export default Home;