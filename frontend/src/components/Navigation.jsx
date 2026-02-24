import { useLocation } from "react-router-dom";

function Navigation() {
    const { pathname } = useLocation()

    return (
        <nav id="app-nav">
            <a className={pathname === '/' ? 'highlight': ''} href="/">Home</a>
            <a className={pathname === '/people' ? 'highlight': ''} href="/people">Community</a>
            <a className={pathname === '/locations' ? 'highlight': ''} href="/locations">Locations</a>
            <a className={pathname === '/matches' ? 'highlight': ''} href="/matches">Matches</a>
            <a className={pathname === '/player_matches' ? 'highlight': ''} href="/player_matches">Player Matches</a>
            <a className={pathname === '/match_officials' ? 'highlight': ''} href="/match_officials">Match Officials</a>
            <a className={pathname === '/sets' ? 'highlight': ''} href="/sets">Sets</a>
            <a className={pathname === '/games' ? 'highlight': ''} href="/games">Games</a>
        </nav>
    )
} export default Navigation;