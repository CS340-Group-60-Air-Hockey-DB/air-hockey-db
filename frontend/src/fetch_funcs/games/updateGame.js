export default async function updateGame(backendURL, gameData) {
    try {
        const response = await fetch(`${backendURL}/games/${gameData.game_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });

        const updated_game = await response.json();

        return {
            status: response.status,
            ...updated_game
        }

    } catch (error) {
        return {
            status: error.status,
            error
        }
    }
};