const getPlayerMatches = async (backendURL, setPlayerMatches) => {
    try {
        const res = await fetch(backendURL + '/player_matches')

        const data = await res.json()

        setPlayerMatches(data)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

export default getPlayerMatches