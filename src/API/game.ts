import { SERVER_BASE_URL, APP_AXIOS } from "./apiConfig";

const getGameData = async ({ gameId }: { gameId: string }) => {
    try {
        const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api/byId/${gameId}`);
        const gameData = response.data;
        const localResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/game/view/${gameId}`, {
            validateStatus: function (status) {
                return status < 500;
            }
        });
        if (localResponse.status !== 200) {
            gameData.localGameData = {}
        } else {
            gameData.localGameData = localResponse.data;
        }
        const reviewResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/review/all/by-game-id/${gameId}`);
        if (reviewResponse.status !== 200) {
            gameData.reviews = [];
        } else {
            gameData.reviews = reviewResponse.data;
        }
        return gameData;
    } catch (error) {
        console.error("Error fetching game data:", error);
        return {};
    }
};

export { getGameData };
