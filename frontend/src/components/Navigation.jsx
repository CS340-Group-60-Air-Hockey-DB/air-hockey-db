function Navigation({location}) {
    return (
        <nav id="app-nav">
            <a class={location === '/' ? 'highlight': ''} href="/">Home</a>
            <a class={location === '/people' ? 'highlight': ''} href="/people">Community</a>
            <a class={location === '/locations' ? 'highlight': ''} href="/locations">Locations</a>
            <a class={location === '/matches' ? 'highlight': ''} href="/matches">Matches</a>
            <a class={location === '/player_matches' ? 'highlight': ''} href="/player_matches">Player Matches</a>
            <a class={location === '/match_officials' ? 'highlight': ''} href="/match_officials">Match Officials</a>
            <a class={location === '/sets' ? 'highlight': ''} href="/sets">Sets</a>
            <a class={location === '/games' ? 'highlight': ''} href="/games">Games</a>
        </nav>
    )
} export default Navigation;