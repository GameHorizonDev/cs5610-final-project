import { useState } from "react";
import ReviewBody from "./ReviewBody";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { useEffect } from "react";

export default function ReviewDetails({ gameData, review, showComments, fetchGames }: any) {
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/comment/add/${review._id}`, { text: newComment });
            if (response.status === 201) {
                review.comments.push(response.data);
                setNewComment("");
            }
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };
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

    const handleUnbookmark = async (reviewId: string) => {
        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/review/unbookmark/${reviewId}`);
            if (response.status === 200) {
                fetchGames();
            }
        } catch (error) {
            console.error("Error unbookmarking review:", error);
        }
    };

    const handlebookmark = async (reviewId: string) => {
        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/review/bookmark/${reviewId}`);
            if (response.status === 200) {
                fetchGames();
            }
        } catch (error) {
            console.error("Error bookmarking review:", error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <ReviewBody gameData={gameData} review={review} />
            </div>

            <div className="mb-3">

                {review.bookmarkedBy.some((user: any) => user._id === profile?._id) ? (
                    <button
                        className="btn btn-outline-danger float-end"
                        onClick={() => handleUnbookmark(review._id)}
                    >
                        Unbookmark ({review.bookmarkedBy.length})
                    </button>
                ) : (
                    <button
                        className="btn btn-outline-primary float-end"
                        onClick={() => handlebookmark(review._id)}
                    >
                        Bookmark ({review.bookmarkedBy.length})
                    </button>
                )}
                {(review.reviewerId?._id === profile?._id) && (
                    <button
                        className="btn btn-outline-secondary float-end me-2"
                        onClick={() => window.location.href = `/GameReviews/${gameData.id}/review/${review._id}/edit`}
                    >
                        Edit Review
                    </button>
                )}
            </div>
            <br />
            {showComments && (
                <div className="comments-section mt-4">
                    <h4>Comments</h4>

                    <div className="list-group">
                        {review?.comments.map((comment: any) => (
                            <div
                                key={comment._id}
                                className="list-group-item d-flex justify-content-between align-items-start mb-2"
                            >
                                <div>
                                    <strong>{comment.commenterId}</strong>: {comment.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="form-control mb-2"
                            rows={2}
                            placeholder="Add a comment"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="btn btn-primary float-end"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
