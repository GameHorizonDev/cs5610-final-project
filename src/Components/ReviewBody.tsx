// Shows the body of a review. This includes the review text, the rating, and the user who wrote the review.

import StarRating from "./StarRating";
import { Link } from "react-router-dom";

function formatDateToLocalTimezone(datetimeString: string): string {
    // Parse the datetime string into a Date object
    const date = new Date(datetimeString);

    // Adjust to local timezone and extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Format as YYYY-mm-dd
    return `${year}-${month}-${day}`;
}

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
                                {formatDateToLocalTimezone(review.createdAt)}
                            </span>
                            <br />
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'gray' }}>
                                {type}
                            </span>
                        </div>

                    </div>
                    <p className="text-start">{review.text}</p>
                </div >
            </div>
        </div>
    );
}
