import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { getCurrUserId } from "../API/user";
import ReviewList from "../Components/ReviewList";

export default function ViewGamePage() {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({});
    const [isFavorited, setIsFavorited] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const setServerId = async () => {
            const serverUserId = await getCurrUserId();
            setUserId(serverUserId);
        }
        setServerId();
    }, [])

    useEffect(() => {
        const getGameData = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api/byId/${gameId}`);
                const gameData = response.data;

                const localResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/game/view/${gameId}`, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });
                if (localResponse.status !== 200) {
                    gameData.localGameData = {};
                } else {
                    gameData.localGameData = localResponse.data;
                    setIsFavorited(localResponse.data.favoritedBy?.includes(userId));
                }

                const reviewResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/review/all/by-game-id/${gameId}?amount=3`);
                if (reviewResponse.status !== 200) {
                    gameData.reviews = [];
                } else {
                    gameData.reviews = reviewResponse.data;
                }

                setGameData(gameData);
            } catch (error) {
                console.error("Error fetching game data:", error);
                setGameData({});
            }
        };

        getGameData();
    }, [gameId, userId]);

    const handleFavorite = async () => {
        if (!userId) {
            return;
        }
        if (!isFavorited) {
            try {
                const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/game/favorite/${gameId}`);
                if (response.status === 200) {
                    setIsFavorited(true);
                    setGameData(prevData => ({
                        ...prevData,
                        localGameData: {
                            ...prevData.localGameData,
                            favoritedBy: [...(prevData.localGameData?.favoritedBy || []), userId]
                        }
                    }));
                }
            } catch (error) {
                console.error("Error adding game to favorites:", error);
            }
        } else {
            try {
                const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/game/unfavorite/${gameId}`);
                if (response.status === 200) {
                    setIsFavorited(false);
                    setGameData(prevData => ({
                        ...prevData,
                        localGameData: {
                            ...prevData.localGameData,
                            favoritedBy: (prevData.localGameData?.favoritedBy || []).filter((id: string) => id !== userId)
                        }
                    }));
                }
            } catch (error) {
                console.error("Error removing game from favorites:", error);
            }
        }
    };

    if (Object.keys(gameData).length === 0) {
        return (
            <p>No active game available. Please select a game to view its details.</p>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{gameData.title}</h1>
            <div className="card mb-4">
                <img src={gameData.thumbnail} className="card-img-top" alt={gameData.title} />
                <div className="card-body">
                    <h5 className="card-title">Game Details</h5>
                    <p><strong>Genre:</strong> {gameData.genre}</p>
                    <p><strong>Platform:</strong> {gameData.platform}</p>
                    <p><strong>Publisher:</strong> {gameData.publisher}</p>
                    <p><strong>Developer:</strong> {gameData.developer}</p>
                    <p><strong>Release Date:</strong> {gameData.release_date}</p>
                    <p><strong>Favorites:</strong> {gameData.localGameData?.favoritedBy?.length || 0}</p>
                    <p className="card-text">{gameData.short_description}</p>
                    <a href={gameData.game_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Play Now</a>

                    <button
                        className="btn btn-outline-primary ms-2 mt-2"
                        onClick={handleFavorite}
                    >
                        {isFavorited ? "Favorited" : "Add to Favorites"}
                    </button>
                    <Link to={`#`} className="btn btn-success ms-2 mt-2">
                        Create a Review
                    </Link>
                </div>
            </div>

            <h2 className="mb-4">User Reviews</h2>
            <ReviewList gameData={gameData} reviews={gameData.reviews} />

            <div className="text-center mt-4">
                <Link to={`/GameReviews/${gameId}`} className="btn btn-primary">
                    View All Reviews
                </Link>
            </div>
        </div>
    );
}
