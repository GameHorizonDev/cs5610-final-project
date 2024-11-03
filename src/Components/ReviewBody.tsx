// Shows the body of a review. This includes the review text, the rating, and the user who wrote the review.

import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function ReviewBody({ gameData, review }: any) {
    return (

        <div className="card mb-3">
            <div className="card-body">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <strong>{review.reviewerId?.username}</strong>
                        <div style={{ marginLeft: '10px' }}>
                            <StarRating rating={review.rating} />
                        </div>
                        <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'gray' }}>
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p>{review.text}</p>
                </div >
            </div>
        </div>
    );
}
