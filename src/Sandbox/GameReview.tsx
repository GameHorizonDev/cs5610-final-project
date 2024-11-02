import React, { useState, useEffect } from 'react';

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

interface Comment {
    _id: string;
    reviewId: string;
    commenterId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

const initialReviews: Review[] = [
    { _id: '1', gameId: 1, reviewerId: "User1", text: "This game is fantastic! I love the graphics and gameplay!", rating: 8, comments: ["c1", "c2"], bookmarkedBy: [], createdAt: "2024-10-01T00:00:00Z", updatedAt: "2024-10-01T00:00:00Z" },
    { _id: '2', gameId: 1, reviewerId: "User2", text: "Not bad, but there are some bugs that need fixing.", rating: 6, comments: ["c3"], bookmarkedBy: [], createdAt: "2024-10-02T00:00:00Z", updatedAt: "2024-10-02T00:00:00Z" },
];

const initialComments: Comment[] = [
    { _id: 'c1', reviewId: '1', commenterId: 'User3', text: "Great review! I totally agree.", createdAt: "2024-10-01T12:00:00Z", updatedAt: "2024-10-01T12:00:00Z" },
    { _id: 'c2', reviewId: '1', commenterId: 'User4', text: "I found it a bit boring though.", createdAt: "2024-10-02T08:30:00Z", updatedAt: "2024-10-02T08:30:00Z" },
    { _id: 'c3', reviewId: '2', commenterId: 'User5', text: "The bugs really ruin it for me.", createdAt: "2024-10-03T09:45:00Z", updatedAt: "2024-10-03T09:45:00Z" },
];

interface ReviewFormProps {
    review: Review | null;
    onSubmit: (text: string, rating: number) => void;
    onCancel: () => void;
}

interface ReviewItemProps {
    review: Review;
    currentUser: string;
    comments: Comment[];
    onToggleBookmark: (reviewId: string) => void;
    onAddComment: (reviewId: string, comment: string) => void;
    onEdit: (review: Review) => void;
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

const ReviewItem: React.FC<ReviewItemProps> = ({ review, currentUser, comments, onToggleBookmark, onAddComment, onEdit }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            onAddComment(review._id, newComment.trim());
            setNewComment('');
        }
    };

    const reviewComments = comments.filter(comment => comment.reviewId === review._id);

    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <strong>{review.reviewerId}</strong>
                <div style={{ marginLeft: '10px' }}>
                    <StarRating rating={review.rating} />
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'gray' }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p>{review.text}</p>
            <button onClick={() => onToggleBookmark(review._id)}>
                {review.bookmarkedBy.includes(currentUser) ? 'Unbookmark' : 'Bookmark'} ({review.bookmarkedBy.length})
            </button>
            <button onClick={() => setShowComments(!showComments)}>
                Comment ({reviewComments.length})
            </button>
            {review.reviewerId === currentUser && <button onClick={() => onEdit(review)}>Edit</button>}

            {showComments && (
                <div style={{ marginTop: '10px' }}>
                    <h4>Comments</h4>
                    {reviewComments.map(comment => (
                        <p key={comment._id} style={{ marginBottom: '5px' }}>
                            <strong>{comment.commenterId}</strong>: {comment.text}
                        </p>
                    ))}
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                        placeholder="Add a comment"
                        style={{ width: '100%', marginTop: '5px' }}
                    />
                    <button onClick={handleCommentSubmit}>Add Comment</button>
                </div>
            )}
        </div>
    );
};

const SandboxGameReview: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [currentUser] = useState("User6");
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleToggleBookmark = (reviewId: string) => {
        setReviews(reviews.map(review =>
            review._id === reviewId
                ? { ...review, bookmarkedBy: review.bookmarkedBy.includes(currentUser) ? review.bookmarkedBy.filter(id => id !== currentUser) : [...review.bookmarkedBy, currentUser] }
                : review
        ));
    };

    const handleAddComment = (reviewId: string, commentText: string) => {
        const newComment: Comment = {
            _id: (comments.length + 1).toString(),
            reviewId,
            commenterId: currentUser,
            text: commentText,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setComments([...comments, newComment]);
    };

    const handleAddReview = (text: string, rating: number) => {
        const newReview: Review = {
            _id: (reviews.length + 1).toString(),
            gameId: 1,
            reviewerId: currentUser,
            text,
            rating,
            comments: [],
            bookmarkedBy: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setReviews([...reviews, newReview]);
        setShowForm(false);
    };

    const handleUpdateReview = (text: string, rating: number) => {
        if (editingReview) {
            setReviews(reviews.map(review =>
                review._id === editingReview._id ? { ...review, text, rating, updatedAt: new Date().toISOString() } : review
            ));
            setEditingReview(null);
            setShowForm(false);
        }
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        setShowForm(false);
    };

    const gameTitle = "Sandbox Adventure";
    const gameImageUrl = "https://example.com/sandbox-adventure-image.jpg";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}>
                        {editingReview ? 'Edit Review' : 'Add Review'}
                    </button>
                )}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '70%', paddingRight: '20px' }}>
                    <h1>{gameTitle}'s Game Reviews</h1>
                    {reviews.map(review => (
                        <ReviewItem
                            key={review._id}
                            review={review}
                            currentUser={currentUser}
                            comments={comments}
                            onToggleBookmark={handleToggleBookmark}
                            onAddComment={handleAddComment}
                            onEdit={handleEditReview}
                        />
                    ))}
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
                <div style={{ width: '30%', padding: '20px', borderLeft: '1px solid #ccc' }}>
                    <h2>{gameTitle}</h2>
                    <img src={gameImageUrl} alt={gameTitle} style={{ width: '100%', marginBottom: '20px' }} />
                    <button onClick={() => console.log("Navigating to game detail page")} style={{ width: '100%', padding: '10px' }}>
                        Go to Game Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SandboxGameReview;
