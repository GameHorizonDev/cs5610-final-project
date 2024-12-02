import { useState } from "react";
import ReviewBody from "./ReviewBody";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ReviewDetails({ gameData, review, showComments, fetchGames }: any) {
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        if (editingCommentId) {
            try {
                const response = await APP_AXIOS.patch(`${SERVER_BASE_URL}/comment/edit/${editingCommentId}`, {
                    text: newComment,
                });
                if (response.status === 200) {
                    fetchGames();
                    setEditingCommentId(null);
                    setNewComment("");
                }
            } catch (error) {
                console.error("Error editing comment:", error);
            }
            return;
        }
        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/comment/add/${review._id}`, { text: newComment });
            if (response.status === 201) {
                fetchGames();
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

    const fetchUserProfile = async (commenterId: string) => {
        try {
            const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile/${commenterId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching profile for ID: ${commenterId}`, error);
            return null;
        }
    };
    const [usernames, setUsernames] = useState<{ [key: string]: string }>({
        [profile?._id]: profile?.username,
    });

    useEffect(() => {
        const fetchUsernames = async () => {
            const newUsers: { [key: string]: string } = {};
            for (const comment of review.comments) {
                if (!usernames[comment.commenterId]) {
                    const profile = await fetchUserProfile(comment.commenterId);
                    if (profile) {
                        newUsers[comment.commenterId] = profile.username;
                    }
                }
            }
            setUsernames({ ...usernames, ...newUsers });
        };

        fetchUsernames();
    }, [review.comments]);

    //delete comment
    const handleDeleteComment = async (commentId: string) => {
        try {
            const response = await APP_AXIOS.delete(`${SERVER_BASE_URL}/comment/delete/${commentId}`);
            if (response.status === 200) {
                fetchGames();
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
    //edit comment
    const handleEditComment = async (comment: any) => {

        console.log("Editing comment:", comment);
        setEditingCommentId(comment._id);
        setNewComment(comment.text);
    };


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
    // Delete Review 
    const handleDeleteReview = async (reviewId: string) => {
        try {
            const response = await APP_AXIOS.delete(`${SERVER_BASE_URL}/review/delete/${reviewId}`);
            if (response.status === 200) {
                fetchGames();
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }


    return (
        <div className="container mt-3">
            <div className="mb-3">
                <ReviewBody gameData={gameData} review={review} />
            </div>

            <div className="mb-3 d-flex justify-content-end">

                {(profile && ["critic", "audience"].includes(profile.role)) && (
                    review.bookmarkedBy.some((user: any) => user._id === profile?._id) ? (
                        <button
                            className="btn btn-outline-danger float-end me-2"
                            onClick={() => handleUnbookmark(review._id)}
                        >
                            Unbookmark ({review.bookmarkedBy.length})
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-primary float-end me-2"
                            onClick={() => handlebookmark(review._id)}
                        >
                            Bookmark ({review.bookmarkedBy.length})
                        </button>
                    ))}
                {(review.reviewerId?._id === profile?._id) && (
                    <button
                        className="btn btn-outline-secondary float-end me-2"
                        onClick={() => window.location.href = `/GameReviews/${gameData.id}/review/${review._id}/edit`}
                    >
                        Edit Review
                    </button>
                )}
                {/* Delete Review */}
                {(profile && ["admin"].includes(profile.role)) && (
                    <button
                        className="btn btn-outline-danger float-end me-2"
                        onClick={async () => {
                            await handleDeleteReview(review._id);
                            window.location.href = `/GameReviews/${gameData.id}`;
                        }}
                    >
                        Delete Review
                    </button>
                )}

            </div>
            <br />
            {
                showComments && (
                    <div className="comments-section mt-4">
                        <h4>Comments</h4>
                        {review.comments.length === 0 && (
                            <div className="alert alert-secondary text-center" role="alert">
                                No comments yet. Be the first to add one!
                            </div>
                        )}
                        <div className="list-group">
                            {review?.comments.map((comment: any) => (
                                <div
                                    key={comment._id}
                                    className="list-group-item d-flex justify-content-between align-items-start"
                                >
                                    <div>
                                        <strong>{usernames[comment.commenterId]}</strong>: {comment.text}
                                    </div>


                                    <div className="d-flex">
                                        {(comment.commenterId === profile?._id) && (<button
                                            className="btn btn-link p-0 me-2 text-secondary"
                                            onClick={() => handleEditComment(comment)}
                                        >
                                            <FaPencil />
                                        </button>)}
                                        {(profile && ["admin"].includes(profile.role)) && (
                                            <button
                                                className="btn btn-link p-0 text-danger"
                                                onClick={() => handleDeleteComment(comment._id)}
                                            >
                                                <FaTrash />
                                            </button>)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(profile && ["critic", "audience"].includes(profile.role)) && (<div className="mt-3">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="form-control mb-2"
                                rows={2}
                                placeholder={editingCommentId ? "Edit your comment" : "Add a comment"}
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="btn btn-primary float-end"
                            >
                                {editingCommentId ? "Update Comment" : "Add Comment"}
                            </button>
                        </div>)}
                    </div>
                )
            }
        </div >
    );
}
