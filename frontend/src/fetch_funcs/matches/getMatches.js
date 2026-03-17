const getMatches = async (backendURL, setMatches) => {
    try {
        const res = await fetch(backendURL + '/matches')

        let data = await res.json()
        data.sort((a, b) => a.match_id - b.match_id)

        setMatches(data)
    }
    catch (error) {
        return {
            status: error.status,
            error
        }
    }
}


export default getMatches;