import React, { useState, useEffect } from 'react';

interface Review {
    id: number;
    user: string;
    text: string;
    rating: number;
    createdDate: string;
}

const initialReviews: Review[] = [
    { id: 1, user: "User1", text: "This game is fantastic! I love the graphics and gameplay!", rating: 5, createdDate: "2024-10-01" },
    { id: 2, user: "User2", text: "Not bad, but there are some bugs that need fixing.", rating: 3, createdDate: "2024-10-02" },
    { id: 3, user: "User3", text: "I didn't enjoy it as much as I thought I would.", rating: 2, createdDate: "2024-10-03" },
    { id: 4, user: "User4", text: "Great game with amazing story! Highly recommend.", rating: 5, createdDate: "2024-10-04" },
    { id: 5, user: "User5", text: "It's okay, but a bit repetitive after a while.", rating: 3, createdDate: "2024-10-05" }
];

interface ReviewFormProps {
    review: Review | null;
    onSubmit: (text: string, rating: number) => void;
    onCancel: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <span>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: star <= rating ? 'gold' : 'gray' }}>
                    ★
                </span>
            ))}
        </span>
    );
};

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit, onCancel }) => {
    const [text, setText] = useState(review ? review.text : '');
    const [rating, setRating] = useState(review ? review.rating : 5);

    useEffect(() => {
        if (review) {
            setText(review.text);
            setRating(review.rating);
        } else {
            setText('');
            setRating(5);
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
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">{review ? 'Update' : 'Submit'} Review</button>
            {review && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

const SandboxGameReview: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [currentUser] = useState("User6"); // Simulate current user

    const handleAddReview = (text: string, rating: number) => {
        if (text.trim()) {
            const newReviewObj: Review = {
                id: reviews.length + 1,
                user: currentUser,
                text: text.trim(),
                rating,
                createdDate: new Date().toISOString().split('T')[0] // get current date
            };
            setReviews([...reviews, newReviewObj]);
        }
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
    };

    const handleUpdateReview = (text: string, rating: number) => {
        if (editingReview) {
            setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, text, rating } : r));
            setEditingReview(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <h2>Game Reviews</h2>
            {reviews.map(review => (
                <div key={review.id} style={{ marginBottom: '20px' }}>
                    <p style={{ marginBottom: '5px' }}>
                        <strong>{review.user}</strong> ({review.createdDate})
                    </p>
                    <p style={{ marginBottom: '5px' }}>
                        <StarRating rating={review.rating} />
                    </p>
                    <p style={{ marginBottom: '5px' }}>{review.text}</p>
                    {review.user === currentUser && (
                        <button onClick={() => handleEditReview(review)}>Edit</button>
                    )}
                </div>
            ))}

            <h3>{editingReview ? 'Edit Your Review' : 'Add New Review'}</h3>
            <ReviewForm
                review={editingReview}
                onSubmit={editingReview ? handleUpdateReview : handleAddReview}
                onCancel={handleCancelEdit}
            />
        </div>
    );
};

export default SandboxGameReview;