const getSets = async (backendURL, setSets) => {
    try {
        const res = await fetch(backendURL + '/sets')

        let data = await res.json()

        setSets(data)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

export default getSets