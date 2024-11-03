// A smaller box of the game metadata, intended to be
// used on review pages as a sidebar item to provide a context of the game.


import { Link } from "react-router-dom";

interface GameData {
    title?: string;
    thumbnail?: string;
    id?: string;
}

export default function GameSummary({ gameData }: { gameData: GameData }) {
    return (
        <div>
            <Link to={`/view-game/${gameData?.id}`}>
                <h2>{gameData?.title}</h2>
            </Link>
            <img src={gameData?.thumbnail} alt={gameData?.title} style={{ width: '100%', marginBottom: '20px' }} />
        </div>
    );
}
