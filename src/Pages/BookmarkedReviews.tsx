import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import StarRating from "../Components/StarRating";

export default function BookmarkedReviews() {
    const [reviewData, setReviewData] = useState<any[]>([]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
                const userData = response.data;
                for (const br of userData.bookmarkedReviews) {
                    const brResponse = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile/${br.reviewerId}`);
                    br.reviewerUsername = brResponse.data.username;
                }
                setReviewData(userData.bookmarkedReviews);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setReviewData([]);
            }
        };

        getUserData();
    }, []);

    const handleUnbookmark = async (reviewId: string) => {
        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/review/unbookmark/${reviewId}`);
            if (response.status === 200) {
                setReviewData(reviewData => reviewData.filter(review => review._id !== reviewId));
            }
        } catch (error) {
            console.error("Error unbookmarking review:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Bookmarked Reviews</h2>
            {reviewData.length === 0 ? (
                <p>No bookmarked reviews available.</p>
            ) : (
                reviewData.map((review: any) => (
                    <div className="card mb-3" key={review._id}>
                        <div className="card-body">
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <Link to={`/profile/${review.reviewerId}`} className="text-decoration-none">
                                        <strong>{review.reviewerUsername}</strong>
                                    </Link>
                                    <div style={{ marginLeft: '10px' }}>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'gray' }}>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p>{review.text}</p>
                                <Link to={`/gamereviews/${review.gameId}/review/${review._id}`} className="text-decoration-none btn btn-primary btn-sm mb-1">
                                    <strong>View Review</strong>
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleUnbookmark(review._id)}
                                >
                                    Unbookmark
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
