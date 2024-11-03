import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
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

interface ReviewFormProps {
    review: Review | null;
    onSubmit: (text: string, rating: number) => void;
    onCancel: () => void;
}

const StarRating: React.FC<{ rating: number, onRatingChange?: (rating: number) => void }> = ({ rating, onRatingChange }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {[2, 4, 6, 8, 10].map(star => (
            <span
                key={star}
                style={{ color: star <= rating ? 'gold' : 'gray', cursor: onRatingChange ? 'pointer' : 'default', fontSize: '24px' }}
                onClick={() => onRatingChange && onRatingChange(star)}
            >
                ★
            </span>
        ))}
    </div>
);

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit, onCancel }) => {
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
                style={{ width: '100%' }}
            />
            <br />
            <label>
                Rating:
                <StarRating rating={rating} onRatingChange={setRating} />
            </label>
            <br />
            <button type="submit">{review ? 'Update' : 'Submit'} Review</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

const SandboxGameReviews: React.FC = () => {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({ reviews: [] });

    useEffect(() => {
        const fetchGames = async () => {
            const game = await getGameData(gameId ? { gameId } : { gameId: '' });
            setGameData(game);
        };
        fetchGames();
    }, [gameId]);

    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddReview = (text: string, rating: number) => {
    };

    const handleUpdateReview = (text: string, rating: number) => {
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        setShowForm(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}>
                        {editingReview ? 'Edit Review' : 'Add Review'}
                    </button>
                )}
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                    <h1>{gameData.title}'s Game Reviews</h1>
                    <ReviewList gameData={gameData} reviews={gameData.reviews}></ReviewList>
                    {showForm && (
                        <>
                            <h3>{editingReview ? 'Edit Your Review' : 'Add New Review'}</h3>
                            <ReviewForm
                                review={editingReview}
                                onSubmit={editingReview ? handleUpdateReview : handleAddReview}
                                onCancel={handleCancelEdit}
                            />
                        </>
                    )}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <GameSummary gameData={gameData}></GameSummary>
                </div>

            </div>
        </div>
    );
};

export default SandboxGameReviews;
