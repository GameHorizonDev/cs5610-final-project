import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { getGameData } from '../API/game';

import ReviewDetails from '../Components/ReviewDetails';
import GameSummary from '../Components/GameSummary';
import StarRating from '../Components/StarRating';

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

interface ReviewFormProps {
    review: Review | null;
    onSubmit: (text: string, rating: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit }) => {
    const [text, setText] = useState(review ? review.text : '');
    const [rating, setRating] = useState(review ? review.rating : 10);

    useEffect(() => {
        if (review) {
            setText(review.text);
            setRating(review.rating);
        }
    }, [review]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(text, rating);
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                cols={50}
                style={{ width: '100%', marginBottom: '1rem' }}
            />
            <div className="d-flex align-items-center mb-3">
                <label className="me-2" htmlFor="rating">Rating:</label>
                <StarRating rating={rating} onRatingChange={setRating} />
            </div>
            <div className="d-flex gap-2 ">
                <button type="submit" className="btn btn-primary">
                    {review ? 'Update' : 'Submit'} Review
                </button>
            </div>
        </form>
    );
};

const ReviewEditor: React.FC = () => {
    const { gameId, revId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({ reviews: [] });

    const [editingReview, setEditingReview] = useState<Review | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            const game = await getGameData(gameId ? { gameId } : { gameId: '' });
            setGameData(game);
        };
        fetchGames();
    }, [gameId]);

    useEffect(() => {
        const review: any = gameData.reviews.find((review: any) => review._id === revId);
        console.log('review', review);
        setEditingReview(review);
    }, [gameData]);

    const handleAddReview = (text: string, rating: number) => {
        alert('Unimplemented yet');

    };

    const handleUpdateReview = (text: string, rating: number) => {
        alert('Unimplemented yet');
    };


    console.log('gameData', gameData);

    console.log('gameId', gameId);
    console.log('editingReview', editingReview);

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <h1>{gameData.title}'s Game Review</h1>
                <h3>{editingReview ? 'Edit Your Review' : 'Add New Review'}</h3>
                <ReviewForm
                    review={editingReview}
                    onSubmit={editingReview ? handleUpdateReview : handleAddReview}
                />

            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <GameSummary gameData={gameData}></GameSummary>
            </div>

        </div>

    );
};

export default ReviewEditor;
