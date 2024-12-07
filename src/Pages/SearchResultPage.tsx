import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

export default function SearchResultPage({ limit = -1, header }: { header: String, limit?: number }) {
    const { search_query } = useParams();
    const [foundGames, setFoundGames] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getGamesBySubStringTitle = async (search: string) => {
            const gamesResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api`);
            if (gamesResponse.status !== 200) {
                return [];
            }
            const filtered_games = gamesResponse.data.filter((game: any) =>
                game.title.toLowerCase().includes(search.toLowerCase())
            );
            let games: any = []
            if (!isNaN(limit) && limit > -1) {
                let availableGames = [...filtered_games];
                for (let i = 0; i < limit; i++) {
                    if (availableGames.length === 0) break;
                    const randomIndex = Math.floor(Math.random() * availableGames.length);
                    games.push(availableGames[randomIndex]);
                    availableGames.splice(randomIndex, 1);
                }
            } else {
                games = filtered_games;
            }
            for (const game of games) {
                try {
                    const localResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/game/view/${game.id}`, {
                        validateStatus: function (status) {
                            return status < 500;
                        }
                    });
                    if (localResponse.status !== 200) {
                        game.numFavorites = 0;
                    } else {
                        game.numFavorites = localResponse.data.favoritedBy.length;
                    }
                    const reviewResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/review/all/by-game-id/${game.id}`);
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
        const fetchGames = async () => {
            setLoading(true);
            try {
                const games = await getGamesBySubStringTitle(search_query || '');
                setFoundGames(games);
            } catch {
                setFoundGames([]);
            }
            setLoading(false);
        };
        fetchGames();
    }, [search_query, limit]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{header}</h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : foundGames.length > 0 ? (
                <ul className="list-group">
                    {foundGames.map((game, index) => (
                        <Link to={`/view-game/${game.id}`} className="text-decoration-none text-dark" key={index}>
                            <li className="list-group-item d-flex justify-content-between align-items-center text-center mb-2">
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
