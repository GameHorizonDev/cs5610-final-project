import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

export default function FavoritedGames() {
    const [gameData, setGameData] = useState<any[]>([]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
                const userData = response.data;
                for (const fg of userData.favoriteGames) {
                    const apiData = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api/byId/${fg.gameId}`);
                    fg.apiData = apiData.data;
                }
                setGameData(userData.favoriteGames);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setGameData([]);
            }
        };

        getUserData();
    }, []);

    const handleUnfavorite = async (gameId: string) => {
        try {
            console.log(gameId);
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/game/unfavorite/${gameId}`);
            if (response.status === 200) {
                setGameData(gameData => gameData.filter(game => game.gameId !== gameId));
            }
        } catch (error) {
            console.error("Error unfavoriting game:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Favorited Games</h2>
            {gameData.length === 0 ? (
                <p>No favorited games available.</p>
            ) : (
                gameData.map((game: any) => (
                    <div className="card mb-3" key={game.gameId}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={game.apiData.thumbnail}
                                    className="img-fluid rounded-start"
                                    alt={game.apiData.title}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{game.apiData.title}</h5>
                                    <p className="card-text">{game.apiData.short_description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">{game.apiData.genre} - {game.apiData.platform}</small>
                                    </p>
                                    <Link
                                        to={game.apiData.game_url}
                                        target="_blank"
                                        className="btn btn-primary mb-2"
                                    >
                                        Play Now
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleUnfavorite(game.gameId)}
                                    >
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
