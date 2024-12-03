// Shows the body of a review. This includes the review text, the rating, and the user who wrote the review.

import StarRating from "./StarRating";
import { Link } from "react-router-dom";

export default function ReviewBody({ gameData, review }: any) {
    let type;
    if (review.reviewerId.role === "critic") {
        type = 'Critic Review';
    } else if (review.reviewerId.role === 'audience') {
        type = 'Audience Review';
    } else {
        type = "Review";
    }
    return (

        <div className="card mb-3">
            <div className="card-body">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Link to={`/profile/${review.reviewerId._id}`} className="text-decoration-none">
                            <strong>{review.reviewerId?.username}</strong>
                        </Link>
                        <div style={{ marginLeft: '10px' }}>
                            <StarRating rating={review.rating} />
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <span style={{ fontSize: '12px', color: 'gray' }}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                            <br />
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'gray' }}>
                                {type}
                            </span>
                        </div>

                    </div>
                    <p>{review.text}</p>
                </div >
            </div>
        </div>
    );
}
