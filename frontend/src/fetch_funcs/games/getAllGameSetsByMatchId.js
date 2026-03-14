const getAllGameSetsByMatchId = async (backendURL, match_id) => {
    try {
        const res = await fetch(backendURL + `/matches/${match_id}`)
        const match_details = await res.json()

        return {
            status: res.status,
            ...match_details
        }
    } catch (error) {
        return {
            status: error.status,
            error
        }
    }
}

export default getAllGameSetsByMatchId