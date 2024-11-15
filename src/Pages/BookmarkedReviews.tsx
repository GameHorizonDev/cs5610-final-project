import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

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
                            <h5 className="card-title">Rating: {review.rating}</h5>
                            <p className="card-text">{review.text}</p>
                            <p><small>Reviewed by: {review.reviewerUsername}</small></p>
                            <Link
                                to={`#`}
                                className="btn btn-primary me-2"
                            >
                                View Review
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleUnbookmark(review._id)}
                            >
                                Unbookmark
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
