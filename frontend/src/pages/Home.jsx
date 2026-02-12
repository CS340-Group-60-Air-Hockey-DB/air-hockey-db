function Home() {
    return (
        <>
            <h1>Competitive Air Hockey</h1>
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
        </>
    )
} export default Home;