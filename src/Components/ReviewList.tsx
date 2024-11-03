// A list of reviews, usually for the same game.
// No interactions. Each review links to the review details page.

import { Link } from "react-router-dom";

import ReviewBody from "./ReviewBody";

export default function ReviewList({ gameData, reviews }: any) {
    return (
        <>
            {reviews.map((review: any) => (
                <Link to={`/sandbox/gamereviews/${gameData.id}/review/${review._id}`}>
                    <ReviewBody gameData={gameData} review={review} />
                </Link>
            ))}
        </>
    );
}
