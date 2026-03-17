const getPlayerMatches = async (backendURL, setPlayerMatches) => {
    try {
        const res = await fetch(backendURL + '/player_matches')

        const data = await res.json()

        setPlayerMatches(data)
    }
    catch (error) {
        return {
            status: error.status,
            error
        }
    }
}

export default getPlayerMatches