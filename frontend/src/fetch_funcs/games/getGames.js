const getGames = async (backendURL, setGames) => {
    try {
        const res = await fetch(backendURL + '/games')
        const data = await res.json()

        setGames(data)
    } catch (error) {
        return {
            status: error.status,
            error
        }
    }
}

export default getGames