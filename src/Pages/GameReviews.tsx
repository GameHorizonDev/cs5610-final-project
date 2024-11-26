import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import GameSummary from '../Components/GameSummary';
import ReviewList from '../Components/ReviewList';

import { getGameData } from '../API/game';

interface Review {
    _id: string;
    gameId: number;
    reviewerId: string;
    rating: number;
    text: string;
    comments: string[]; // Comment IDs
    bookmarkedBy: string[];
    createdAt: string;
    updatedAt: string;
}


const GameReviews: React.FC = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({ reviews: [] });

    useEffect(() => {
        const fetchGames = async () => {
            const game = await getGameData(gameId ? { gameId } : { gameId: '' });
            setGameData(game);
        };
        fetchGames();
    }, [gameId]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>

            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                    <h1>{gameData.title}'s Game Reviews</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Link to={`/GameReviews/${gameId}/review/new/edit`} className="btn btn-success ms-2">
                            Create a Review
                        </Link>
                    </div>
                    <ReviewList gameData={gameData} reviews={gameData.reviews}></ReviewList>

                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <GameSummary gameData={gameData}></GameSummary>
                </div>

            </div>
        </div>
    );
};

export default GameReviews;
