// Shows the body of the review, and additional interactions if needed.
import React, { useState, useEffect } from 'react';
import ReviewBody from "./ReviewBody";

export default function ReviewDetails({ gameData, review, showComments }: any) {
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = () => {
    };

    return (
        <div>
            <ReviewBody gameData={gameData} review={review} />

            <button onClick={() => false}>
                Bookmark (0)
            </button>

            {showComments && (
                <div style={{ marginTop: '10px' }}>
                    <h4>Comments</h4>
                    {review?.comments.map((comment: any) => (
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
}
