export default async function addGame(backendURL, gameData) {
    try {
        const response = await fetch(`${backendURL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });

        const game = await response.json();

        return {
            status: response.status,
            ...game
        }

    } catch (error) {
        return {
            status: error.status,
            error
        }
    }
};