export default async function addPerson(backendURL, personData) {
    try {
        // Make a POST request to the backend
        const response = await fetch(`${backendURL}/people`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personData)
        });

        // Convert the response into JSON format
        const person = await response.json();

        return {
            status: response.status,
            ...person
        }

    } catch (error) {
        // If the API call fails, print the error to the console
        return {
            status: error.status,
            error
        }
    }
};