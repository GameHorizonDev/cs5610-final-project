import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getGameData } from '../API/game';
import GameSummary from '../Components/GameSummary';
import StarRating from '../Components/StarRating';
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

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
// change review when user edits anything
// const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit }) => {
//     const [text, setText] = useState(review ? review.text : '');
//     const [rating, setRating] = useState(review ? review.rating : 10);

//     useEffect(() => {
//         if (review) {
//             setText(review.text);
//             setRating(review.rating);
//         }
//     }, [review]);

//     // construct the review object and send it to the server
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(text, rating);
//     };

//     return (
//         <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
//             <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 rows={3}
//                 cols={50}
//                 style={{ width: '100%', marginBottom: '1rem' }}
//             />
//             <div className="d-flex align-items-center mb-3">
//                 <label className="me-2" htmlFor="rating">Rating:</label>
//                 <StarRating rating={rating} onRatingChange={setRating} />
//             </div>
//             <div className="d-flex gap-2 ">
//                 <button type="submit" className="btn btn-primary">
//                     {review ? 'Update' : 'Submit'} Review
//                 </button>
//             </div>
//         </form>
//     );
// };

const ReviewEditor: React.FC = () => {
    const { gameId, revId } = useParams();
    const [gameData, setGameData] = useState<{ [key: string]: any }>({ reviews: [] });

    const [editingReview, setEditingReview] = useState<Review | null>(null);

    const fetchGames = async () => {
        const game = await getGameData(gameId ? { gameId } : { gameId: '' });
        setGameData(game);
    };
    useEffect(() => {
        fetchGames();
    }, [gameId]);

    useEffect(() => {
        const review: any = gameData.reviews.find((review: any) => review._id === revId);
        console.log('review', review);
        if (review) {
            setEditingReview(review);
        } else {
            const newReview: Review = {
                _id: 'new', // Set ID to new
                gameId: parseInt(gameId || '0'),
                reviewerId: 'currentUserId',
                rating: 0,
                text: '',
                comments: [],
                bookmarkedBy: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setEditingReview(newReview);
        }
    }, [gameData]);

    const handleAddReview = async () => {
        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/review/add`, editingReview);
            window.location.href = `/GameReviews/${gameId}/review/${response.data._id}`;
        } catch (error) {
            console.error("Error add review:", error);
        }
    };

    const handleUpdateReview = async () => {
        try {
            const response = await APP_AXIOS.patch(`${SERVER_BASE_URL}/review/edit/${editingReview?._id}`, editingReview);
            window.location.href = `/GameReviews/${gameId}/review/${editingReview?._id}`;
        } catch (error) {
            console.error("Error edit review:", error);
        }
    };


    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingReview?._id === 'new') {
            await handleAddReview();
        } else {
            await handleUpdateReview();
        }
        fetchGames();
    };

    console.log('gameData', gameData);

    console.log('gameId', gameId);
    console.log('editingReview', editingReview);
    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                <h1>{gameData.title}'s Game Review</h1>
                <h3>{editingReview?._id !== 'new' ? 'Edit Your Review' : 'Add New Review'}</h3>
                <form onSubmit={handleReviewSubmit} style={{ textAlign: 'left' }}>
                    <textarea
                        value={editingReview?.text}
                        onChange={(e) => setEditingReview(prev => prev ? { ...prev, text: e.target.value } : null)}
                        rows={3}
                        cols={50}
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <div className="d-flex align-items-center mb-3">
                        <label className="me-2" htmlFor="rating">Rating:</label>
                        <StarRating rating={editingReview ? editingReview.rating : 10} onRatingChange={(newRating) => setEditingReview(prev => prev ? { ...prev, rating: newRating } : null)} />
                    </div>
                    <div className="d-flex gap-2 ">
                        <button type="submit" className="btn btn-primary">
                            {editingReview?._id !== 'new' ? 'Update' : 'Submit'} Review
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <GameSummary gameData={gameData}></GameSummary>
            </div>

        </div>

    );
};

export default ReviewEditor;
