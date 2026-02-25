const getGames = async (backendURL, setGames) => {
    const res = await fetch(backendURL + '/games')
    const data = await res.json()

    setGames(data)
}

export default getGames