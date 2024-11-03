import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SERVER_BASE_URL } from "../API/apiConfig";

export default function SearchResultPage() {
    const { search_query } = useParams();
    const [foundGames, setFoundGames] = useState<any[]>([]);

    const getGamesBySubStringTitle = async (search: string) => {
        const gamesResponse = await axios.get(`${SERVER_BASE_URL}/games-api`);
        if (gamesResponse.status !== 200) {
            return [];
        }
        const games = gamesResponse.data.filter((game: any) =>
            game.title.toLowerCase().includes(search.toLowerCase())
        );
        for (const game of games) {
            try {
                const localResponse = await axios.get(`${SERVER_BASE_URL}/game/view/${game.id}`, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });
                if (localResponse.status !== 200) {
                    game.numFavorites = 0;
                } else {
                    game.numFavorites = localResponse.data.favoritedBy.length;
                }
                const reviewResponse = await axios.get(`${SERVER_BASE_URL}/review/all/by-game-id/${game.id}`);
                if (reviewResponse.status !== 200) {
                    game.numReviews = 0;
                } else {
                    game.numReviews = reviewResponse.data.length;
                }
            } catch {
                game.numFavorites = 0;
                game.numReviews = 0;
            }
        }
        return games;
    };

    useEffect(() => {
        const fetchGames = async () => {
            const games = await getGamesBySubStringTitle(search_query || '');
            setFoundGames(games);
        };
        fetchGames();
    }, [search_query]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Search Results</h1>
            {foundGames.length > 0 ? (
                <ul className="list-group">
                    {foundGames.map((game, index) => (
                        <Link to={`/view-game/${game.id}`} className="text-decoration-none text-dark">
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{game.title}</h5>
                                    <p className="mb-1">{game.short_description}</p>
                                    <small className="text-muted">{game.genre} | Released: {game.release_date}</small>
                                </div>
                                <div>
                                    <span className="badge bg-primary rounded-pill me-1">{game.numReviews} reviews</span>
                                    <span className="badge bg-primary rounded-pill">{game.numFavorites} favorites</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No games found matching your search.</p>
            )}
        </div>
    );
}
