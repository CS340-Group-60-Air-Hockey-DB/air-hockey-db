const getPeople = async function (backendURL, setPeople) {
    try {
        // Make a GET request to the backend
        const response = await fetch(backendURL + '/people');

        // Convert the response into JSON format
        const people = await response.json();

        // Update the people state with the response data
        setPeople(people);

    }
    catch (error) {
        return {
            status: error.status,
            error
        }
    }
};


export default getPeople