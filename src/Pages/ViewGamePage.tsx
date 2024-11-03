import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SERVER_BASE_URL } from "../API/apiConfig";

export default function ViewGamePage() {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const getGameData = async () => {
            try {
                const response = await axios.get(`${SERVER_BASE_URL}/games-api/byId/${gameId}`);
                const gameData = response.data;

                const localResponse = await axios.get(`${SERVER_BASE_URL}/game/view/${gameId}`, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });
                if (localResponse.status !== 200) {
                    gameData.localGameData = {};
                } else {
                    gameData.localGameData = localResponse.data;
                }

                const reviewResponse = await axios.get(`${SERVER_BASE_URL}/review/all/by-game-id/${gameId}`);
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
    }, [gameId]);

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
                </div>
            </div>

            <h2 className="mb-4">User Reviews</h2>
            {gameData.reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                gameData.reviews.map((review: any) => (
                    <Link to={`/sandbox/gamereview`} className="text-decoration-none text-dark">
                        <div className="card mb-3" key={review._id}>
                            <div className="card-body">
                                <h5 className="card-title">Rating: {review.rating}</h5>
                                <p className="card-text">{review.text}</p>
                                <p><small>Reviewed by: {review.reviewerId.username}</small></p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}
