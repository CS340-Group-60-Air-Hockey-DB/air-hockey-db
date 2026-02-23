const getLocations = async function (backendURL, setLocations) {
    try {
        // Make a GET request to the backend
        const response = await fetch(backendURL + '/locations');

        // Convert the response into JSON format
        const data = await response.json();

        // Update the locations state with the response data
        setLocations(data);

    } catch (error) {
        // If the API call fails, print the error to the console
        console.log('Error:', error);
    }
};

export default getLocations