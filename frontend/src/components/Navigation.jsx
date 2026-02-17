function Navigation({location}) {
    return (
        <nav id="app-nav">
            <a className={location === '/' ? 'highlight': ''} href="/">Home</a>
            <a className={location === '/people' ? 'highlight': ''} href="/people">Community</a>
            <a className={location === '/locations' ? 'highlight': ''} href="/locations">Locations</a>
            <a className={location === '/matches' ? 'highlight': ''} href="/matches">Matches</a>
            <a className={location === '/player_matches' ? 'highlight': ''} href="/player_matches">Player Matches</a>
            <a className={location === '/match_officials' ? 'highlight': ''} href="/match_officials">Match Officials</a>
            <a className={location === '/sets' ? 'highlight': ''} href="/sets">Sets</a>
            <a className={location === '/games' ? 'highlight': ''} href="/games">Games</a>
        </nav>
    )
} export default Navigation;