import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import GameSummary from '../Components/GameSummary';
import ReviewList from '../Components/ReviewList';
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

import { getGameData } from '../API/game';



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

    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
                const userData = response.data;
                console.log("User data:", userData);
                setProfile(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUserData();
    }, []);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>

            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                    <h1>{gameData?.title ? `${gameData.title}'s Game Reviews` : 'No Game Reviews Available'}</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        {profile && ["critic", "audience"].includes(profile.role) && gameData && (
                            <Link to={`/GameReviews/${gameId}/review/new/edit`} className="btn btn-success ms-2">
                                Create a Review
                            </Link>
                        )}
                    </div>

                    {gameData?.reviews && gameData.reviews.length > 0 ? (
                        <ReviewList gameData={gameData} reviews={gameData.reviews}></ReviewList>
                    ) : (
                        <div className="alert alert-secondary text-center" role="alert">No reviews available for this game.</div>
                    )}

                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <GameSummary gameData={gameData}></GameSummary>
                </div>

            </div>
        </div>
    );
};

export default GameReviews;
