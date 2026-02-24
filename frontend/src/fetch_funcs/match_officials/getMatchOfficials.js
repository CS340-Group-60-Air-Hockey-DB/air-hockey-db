const getMatchOfficials = async (backendURL, setMatchOfficials) => {
    try {
        const res = await fetch(backendURL + '/match_officials')

        const data = await res.json()
        setMatchOfficials(data)
    }
    catch (error) {
        console.log('Match Officials Fetch Error:', error)
    }
}

export default getMatchOfficials