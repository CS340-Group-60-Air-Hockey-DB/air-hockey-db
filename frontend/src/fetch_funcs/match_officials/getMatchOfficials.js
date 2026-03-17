const getMatchOfficials = async (backendURL, setMatchOfficials) => {
    try {
        const res = await fetch(backendURL + '/match_officials')

        const data = await res.json()
        setMatchOfficials(data)
    }
    catch (error) {
        return {
            status: error.status,
            error
        }
    }
}

export default getMatchOfficials