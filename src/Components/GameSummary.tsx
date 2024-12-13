// A smaller box of the game metadata, intended to be
// used on review pages as a sidebar item to provide a context of the game.

import { Link } from "react-router-dom";

interface GameData {
    title?: string;
    thumbnail?: string;
    id?: string;
    genre?: string;
    platform?: string;
    publisher?: string;
    developer?: string;
    release_date?: string;
}

export default function GameSummary({ gameData }: { gameData: GameData }) {
    return (
        <div className="text-start">
            <Link to={`/view-game/${gameData?.id}`}>
                <h2>{gameData?.title}</h2>
            </Link>
            <img src={gameData?.thumbnail} alt={gameData?.title} style={{ width: '100%', marginBottom: '20px' }} />
            <p><strong>Genre:</strong> {gameData.genre}</p>
            <p><strong>Platform:</strong> {gameData.platform}</p>
            <p><strong>Publisher:</strong> {gameData.publisher}</p>
            <p><strong>Developer:</strong> {gameData.developer}</p>
            <p><strong>Release Date:</strong> {gameData.release_date}</p>
        </div>
    );
}
