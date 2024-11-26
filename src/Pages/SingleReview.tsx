import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { getGameData } from '../API/game';

import ReviewDetails from '../Components/ReviewDetails';
import GameSummary from '../Components/GameSummary';


const SingleReview: React.FC = () => {
    const { gameId, revId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({ reviews: [] });

    const fetchGames = async () => {
        const game = await getGameData(gameId ? { gameId } : { gameId: '' });
        setGameData(game);
    };
    useEffect(() => {
        fetchGames();
    }, [gameId]);

    console.log('gameData', gameData);
    const review: any = gameData.reviews.find((review: any) => review._id === revId);

    console.log('gameId', gameId);
    console.log('gameData', gameData);
    console.log('review', review);

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <h1>{gameData.title}'s Game Review</h1>
                {review && <ReviewDetails gameData={gameData} review={review} showComments={true} fetchGames={fetchGames} />}
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <GameSummary gameData={gameData}></GameSummary>
            </div>

        </div>

    );
};

export default SingleReview;
